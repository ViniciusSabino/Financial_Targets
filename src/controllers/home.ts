import { Context } from 'koa';

import config from '../config';

export default (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
        name: config.name,
        environment: config.environment,
        port: config.port,
    };
};
