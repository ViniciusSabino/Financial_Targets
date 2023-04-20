import { Context } from 'koa';

import { BalanceMapped, CurrentBalancesMapped } from '../services/balances/mapper';
import service, { BalanceInput } from '../services/balances/service';
import HttpStatus from '../utils/enums/httpStatus';

const current = async (ctx: Context): Promise<void> => {
    const { userId } = ctx.user;

    const currentBalances: CurrentBalancesMapped = await service.getCurrentBalances(userId);

    ctx.status = HttpStatus.OK;
    ctx.body = currentBalances;
};

const create = async (ctx: Context): Promise<void> => {
    const { body } = ctx.request;

    const balanceEntries: BalanceInput = {
        id: body.id,
        accountId: body.accountId,
        month: body.month,
        year: body.year,
        value: body.value,
    };

    const createdBalance: BalanceMapped = await service.create(balanceEntries);

    ctx.status = HttpStatus.OK;
    ctx.body = createdBalance;
};

export default { current, create };
