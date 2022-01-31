/* eslint-disable no-console */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

export const createApp = (): Koa => {
    const app = new Koa();

    app.use(cors());
    app.use(bodyParser());
    app.use(logger());
    // TODO: Add Error Handler
    // TODO: Add Routes

    return app;
};
