import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const GqlReq = createParamDecorator(
    (_data: unknown, context: ExecutionContext): Request => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    },
);