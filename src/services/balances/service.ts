import { Balance } from '../../database/models/Balance';
import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import extendedError from '../../utils/errors/extendedError';
import { DateInfo, getCurrentMonthName, getCurrentYear } from '../../utils/helpers/date';
import accountQuery from '../accounts/queries';
import { CurrentBalancesMapped, mapperCurrentBalances, BalanceMapped, mapperCreatedBalance } from './mapper';
import query from './queries';
import { BalanceCreation } from './queries/create-or-update-balance';

export interface BalanceInput {
    id?: string;
    accountId?: string;
    month?: Months;
    year?: number;
    value?: number;
}

const getCurrentBalances = async (userId: string): Promise<CurrentBalancesMapped> => {
    const dateInfo: DateInfo = {
        month: getCurrentMonthName(),
        year: getCurrentYear(),
    };

    const currentBalances: Array<Balance> = await query.findCurrentByUser(userId, dateInfo);

    const mappedBalances: CurrentBalancesMapped = mapperCurrentBalances(currentBalances, dateInfo);

    return mappedBalances;
};

const create = async (balanceInput: BalanceInput): Promise<BalanceMapped> => {
    const account = await accountQuery.findById(balanceInput.accountId || '');

    if (!balanceInput.id && !account) {
        throw extendedError({ error: new Error('Account is invalid'), type: ErrorType.CREATE_BALANCE_ERROR });
    }

    const balanceCreation: BalanceCreation = {
        id: balanceInput.id,
        account,
        month: balanceInput.month,
        year: balanceInput.year,
        value: balanceInput.value,
    };

    const balance: Balance = await query.createOrUpdate(balanceCreation);

    const balanceMapped: BalanceMapped = mapperCreatedBalance(balance);

    return balanceMapped;
};

export default { create, getCurrentBalances };
