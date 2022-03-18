import compose from 'koa-compose';
import { Router } from 'koa-joi-router';

import homeRouter from './home';
import balancesRouter from './balances';
import accountsRouter from './accounts';

const publicRoutes = [homeRouter, balancesRouter, accountsRouter];
const privateRoutes: Array<Router> = [];

export default {
    public: compose(publicRoutes.map((routes) => routes.middleware())),
    private: privateRoutes,
};
