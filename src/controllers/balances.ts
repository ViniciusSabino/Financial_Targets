import { Context } from 'koa';

import service, { BalanceInput } from '../services/balances/service';

const current = async (ctx: Context): Promise<void> => {
    const { userId } = ctx.user;

    const currentBalances = await service.getCurrentBalances(userId);

    ctx.status = 200;
    ctx.body = currentBalances;
};

const create = async (ctx: Context): Promise<void> => {
    const { accountId, month, year, value } = ctx.request.body;

    const balanceEntries: BalanceInput = { accountId, month, year, value };

    const createdBalance = await service.create(balanceEntries);

    ctx.status = 200;
    ctx.body = createdBalance;
};

export default { current, create };
