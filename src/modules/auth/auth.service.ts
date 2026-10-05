import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RegisterInput } from "./dto/register.input";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import type { JwtPayload } from "./interfaces/jwt.interface";
import type { JwtSignOptions } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";
import { hash, verify } from "argon2";
import type { Response, Request } from "express";
import { isDev } from "../../utils/is-dev.util";


type TokenTTL = JwtSignOptions["expiresIn"];

@Injectable()
export class AuthService {
     private readonly JWT_ACCESS_TOKEN_TTL: TokenTTL;
     private readonly JWT_REFRESH_TOKEN_TTL: TokenTTL;

     private readonly COOKIE_DOMAIN: string;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_ACCESS_TOKEN_TTL = (process.env.JWT_ACCESS_TOKEN_TTL || "2h") as TokenTTL;
        this.JWT_REFRESH_TOKEN_TTL = (process.env.JWT_REFRESH_TOKEN_TTL || "7d") as TokenTTL;

        this.COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "localhost";
    }

    async register(res: Response, input: RegisterInput) {

        const hashedPassword = await hash(input.password);

        const user = await this.userService.create({
            ...input,
            password: hashedPassword,
        });

        return this.auth(res, user.id, user.email);
    }

    async login(res: Response, input: LoginInput) {

        const user = await this.userService.findByEmail(input.email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const isValidPassword = await verify(user.password, input.password);

        if (!isValidPassword) {
            throw new NotFoundException("User not found");
        }

        return this.auth(res, user.id, user.email);
    }

    async refresh(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            throw new UnauthorizedException("Can`t refresh");
        }

        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

        if (payload) {
            const user = await this.userService.findOne(payload.id);

            if (!user) {
                throw new NotFoundException("User not found");
            }

            return this.auth(res, user.id, user.email);
        }
    }

    logout(res: Response) {
        this.setCookie(res, 'refreshToken', new Date(0));
        return true;
    }

    async validate(id: string) {
        const user = await this.userService.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    private async auth(res: Response, id: string, email: string) {
        const { accessToken, refreshToken } = await this.generateTokens(id, email);

        this.setCookie(res,
            refreshToken,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        ); // ToDo: get rid of hardcoded expiration date

        return { accessToken };
    }

    private async generateTokens(id: string, email: string) {
        const payload: JwtPayload = { id, email };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private setCookie(res: Response, value: string, expires: Date) {

        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN, // ToDo: fix
            expires,
            secure: !isDev(),
            sameSite: isDev() ? "lax" : "none"
        });
    }
}