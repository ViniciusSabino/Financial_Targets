import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

import routes from './routes';
import errorHandling from './middlewares/errorHandling';
import authentication from './middlewares/authentication';

export const createApp = (): Koa => {
    const app = new Koa();

    app.use(cors());
    app.use(bodyParser());
    app.use(logger());
    app.use(errorHandling);
    app.use(routes.public);
    app.use(authentication);
    app.use(routes.private);

    return app;
};
