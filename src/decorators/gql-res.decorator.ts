import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Response } from 'express';

export const GqlRes = createParamDecorator(
    (_data: unknown, context: ExecutionContext): Response => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().res;
    },
);