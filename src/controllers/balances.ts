import { Context } from 'koa';

import { BalanceMapped, CurrentBalancesMapped } from '../services/balances/mapper';
import service, { BalanceInput } from '../services/balances/service';

const current = async (ctx: Context): Promise<void> => {
    const { userId } = ctx.user;

    const currentBalances: CurrentBalancesMapped = await service.getCurrentBalances(userId);

    ctx.status = 200;
    ctx.body = currentBalances;
};

// TODO: Criar ou editar o saldo de uma conta
const create = async (ctx: Context): Promise<void> => {
    const { body } = ctx.request;

    const balanceEntries: BalanceInput = {
        accountId: body.accountId,
        month: body.month,
        year: body.year,
        value: body.value,
    };

    const createdBalance: BalanceMapped = await service.create(balanceEntries);

    ctx.status = 200;
    ctx.body = createdBalance;
};

export default { current, create };
