import { Context, Next } from 'koa';

import { ApiError } from '../utils/errors/apiError';

const errorHandling = async (ctx: Context, next: Next): Promise<void> => {
    try {
        await next();
    } catch (err) {
        if (err instanceof ApiError) {
            ctx.status = err.status;
            ctx.body = {
                type: err.type,
                message: err.message,
            };
        }
    }
};

export default errorHandling;
