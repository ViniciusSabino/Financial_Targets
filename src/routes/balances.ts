import Router from 'koa-joi-router';

import balancesController from '../controllers/balances';

const router = Router();

router.prefix('/api/public/balances');

router.route({
    method: 'GET',
    path: '/current',
    handler: balancesController.current,
});

export default router;
