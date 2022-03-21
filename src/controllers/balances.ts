import { Context } from 'koa';

import service, { BalanceEntries } from '../services/balances/service';
import { CurrentBalanceTypes } from '../utils/enums/balances';
import { Months } from '../utils/enums/date';

const current = async (ctx: Context): Promise<void> => {
    const CURRENT_BALANCES_DATA = {
        month: Months.JANUARY,
        year: 2022,
        accounts: [
            {
                id: 1,
                name: 'Itaú',
                type: CurrentBalanceTypes.ACCOUNT,
                value: 9488,
                isMain: true,
            },
        ],
        investments: [
            {
                id: 2,
                name: 'Itaú Poupança',
                type: CurrentBalanceTypes.INVESTMENTS,
                value: 25739,
                isMain: true,
            },
        ],
    };

    const { userId } = ctx.user;

    const currentBalances = await service.getCurrentBalances(userId);

    ctx.status = 200;
    ctx.body = currentBalances;
};

const create = async (ctx: Context) => {
    const { accountId, month, year, value } = ctx.request.body;

    const balanceEntries: BalanceEntries = { accountId, month, year, value };

    const createdBalance = await service.create(balanceEntries);

    ctx.status = 200;
    ctx.body = createdBalance;
};

export default { current, create };
