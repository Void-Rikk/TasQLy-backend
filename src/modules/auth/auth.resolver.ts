import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthPayload } from "./dto/auth-payload.type";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
import type { Response, Request } from "express";
import { GqlRes } from "../../decorators/gql-res.decorator";
import { GqlReq } from "../../decorators/gql-req.decorator";


@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthPayload)
    login(
        @GqlRes() res: Response,
        @Args('input') input: LoginInput
    ) {
        return this.authService.login(res, input);
    }

    @Mutation(() => AuthPayload)
    register(
        @GqlRes() res: Response,
        @Args('input') input: RegisterInput
    ) {
        if (!res) {
            return false;
        }
        return this.authService.register(res, input);
    }

    @Mutation(() => AuthPayload)
    refresh(
        @GqlReq() req: Request,
        @GqlRes() res: Response
    ) {
        return this.authService.refresh(req, res);
    }

    @Mutation(() => Boolean)
    logout(@GqlRes() res: Response) {
        return this.authService.logout(res);
    }
}