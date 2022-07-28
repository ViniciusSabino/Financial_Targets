import { Context } from 'koa';

import { AccountType } from '../utils/enums/accounts';
import service, { CheckingAccount } from '../services/accounts/service';

const createCheckingAccount = async (ctx: Context): Promise<void> => {
    const { userId } = ctx.user;

    const checkingAccount: CheckingAccount = {
        name: ctx.request.body.name,
        type: AccountType.CHECKING_ACCOUNT,
        isMain: ctx.request.body.isMain,
    };

    const createdAccount = await service.createCheckingAccount(checkingAccount, userId);

    ctx.status = 200;
    ctx.body = createdAccount;
};

const listAllAccounts = async (ctx: Context): Promise<void> => {
    const { userId } = ctx.user;

    const accounts = await service.listAllAccounts(userId);

    ctx.status = 200;
    ctx.body = accounts;
};

export default { createCheckingAccount, listAllAccounts };
