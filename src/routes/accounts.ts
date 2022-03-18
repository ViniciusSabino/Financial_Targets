import Router from 'koa-joi-router';

import accountsController from '../controllers/accounts';

const router = Router();

router.prefix('/api/public/accounts');

router.route({
    method: 'POST',
    path: '/checking/create',
    handler: accountsController.createCheckingAccount,
});

export default router;
