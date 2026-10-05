import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../../../generated/prisma/client";
import { GqlExecutionContext } from "@nestjs/graphql";


export const Authorized = createParamDecorator(
    (data: Exclude<keyof User, 'password'>, ctx: ExecutionContext) => {
        const request = GqlExecutionContext.create(ctx).getContext().req;

        const user = request.user;

        return data ? user![data] : user;
    }
);