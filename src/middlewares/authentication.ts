import { Context, Next } from 'koa';

import { User } from '../database/models/User';
import { findUserById } from '../services/common/user/queries';
import ErrorType from '../utils/enums/errorType';
import extendedError from '../utils/errors/extendedError';

// TODO: receive bearer token (internal)
const authentication = async (ctx: Context, next: Next): Promise<void> => {
    const { userid } = ctx.request.headers;

    try {
        const userId = Array.isArray(userid) ? userid[0] : userid || '';

        if (!userId) throw new Error('Missing Token');

        const user: User = await findUserById(userId);

        if (!user) throw new Error('User Not Found');

        ctx.user = { userId };
    } catch (err) {
        throw extendedError({ error: err as Error, type: ErrorType.UNAUTHORIZED });
    }

    await next();
};

export default authentication;
