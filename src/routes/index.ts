import compose from 'koa-compose';
import { Router } from 'koa-joi-router';

import homeRouter from './home';
import balancesRouter from './balances';

const publicRoutes = [homeRouter, balancesRouter];
const privateRoutes: Array<Router> = [];

export default {
    public: compose(publicRoutes.map((routes) => routes.middleware())),
    private: privateRoutes,
};
