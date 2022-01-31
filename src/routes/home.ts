import Router from 'koa-joi-router';

import homeController from '../controllers/home';

const router = Router();

router.prefix('/api/public');

router.route({
    method: 'GET',
    path: '/home',
    handler: homeController,
});

export default router;
