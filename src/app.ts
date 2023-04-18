import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

import routes from './routes';
import errorHandling from './middlewares/errorHandling';
import authentication from './middlewares/authentication';
import config from './config';

export const createApp = (): Koa => {
    const app = new Koa();

    app.use(cors());
    app.use(bodyParser());
    if (config.environment !== 'test') app.use(logger());
    app.use(errorHandling);
    app.use(routes.public);
    app.use(authentication);
    app.use(routes.private);

    return app;
};
