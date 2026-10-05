import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import type { JwtPayload } from "../interfaces/jwt.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "MegaSecret",
            algorithms: ["HS256"]
        });
    }

    validate(payload: JwtPayload): Promise<false | unknown | null> | false | unknown | null {
        return this.authService.validate(payload.id);
    }
}