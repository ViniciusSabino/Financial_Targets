import Router from 'koa-joi-router';

import controller from '../controllers/balances';

const router = Router();

router.prefix('/api/private/balances');

router.route([
    {
        method: 'GET',
        path: '/current',
        handler: controller.current,
    },
    {
        method: 'POST',
        path: '/create',
        handler: controller.create,
    },
]);

export default router;
