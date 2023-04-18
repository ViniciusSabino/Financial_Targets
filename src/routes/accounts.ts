import Router from 'koa-joi-router';

import controller from '../controllers/accounts';
import validators from '../validators/accounts/handler';

const router = Router();

router.prefix('/api/private/accounts');

router.route([
    {
        method: 'POST',
        path: '/checking/create',
        handler: [validators.validCreateCheckingAccount, controller.createCheckingAccount],
    },
    {
        method: 'GET',
        path: '/all',
        handler: [controller.listAllAccounts],
    },
]);

export default router;
