import { Context, Next } from 'koa';

import { createCheckingAccountSchema } from './schemas';
import extendedError from '../../utils/errors/extendedError';
import ErrorType from '../../utils/enums/errorType';

const validCreateCheckingAccount = async (ctx: Context, next: Next): Promise<void> => {
    const { userId } = ctx.user;

    try {
        await createCheckingAccountSchema.validateAsync({ ...ctx.request.body, userId });
    } catch (error) {
        extendedError({ error: error as Error, type: ErrorType.VALIDATION_ERROR });
    }

    await next();
};

export default {
    validCreateCheckingAccount,
};
