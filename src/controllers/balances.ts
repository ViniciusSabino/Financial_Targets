import { Context } from 'koa';

import { CurrentBalanceTypes } from '../utils/enums/balances';
import { Months } from '../utils/enums/date';

export interface Balance {
    id: number;
    name: string;
    type: CurrentBalanceTypes;
    value: number;
    isMain: boolean;
}

export interface CurrentBalancesResponse {
    month: Months;
    year: number;
    accounts: Array<Balance>;
    investments: Array<Balance>;
}

const current = (ctx: Context): void => {
    const CURRENT_BALANCES_DATA: CurrentBalancesResponse = {
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

    ctx.status = 200;
    ctx.body = CURRENT_BALANCES_DATA;
};

export default { current };
