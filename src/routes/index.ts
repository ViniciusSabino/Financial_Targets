import compose from 'koa-compose';
import { Router } from 'koa-joi-router';

import homeRouter from './home';
import balancesRouter from './balances';
import accountsRouter from './accounts';

const publicRoutes: Array<Router> = [homeRouter];
const privateRoutes: Array<Router> = [balancesRouter, accountsRouter];

export default {
    public: compose(publicRoutes.map((routes) => routes.middleware())),
    private: compose(privateRoutes.map((routes) => routes.middleware())),
};
