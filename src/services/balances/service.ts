import { Balance } from '../../database/models/Balance';
import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import extendedError from '../../utils/errors/extendedError';
import { DateInfo, getCurrentMonthName, getCurrentYear } from '../../utils/helpers/date';
import { findAccountById } from '../accounts/queries';
import { CurrentBalancesMapped, mapperCurrentBalances, BalanceMapped, mapperCreatedBalance } from './mapper';
import { createBalance, findCurrentBalancesByUser } from './queries';
import { BalanceCreation } from './queries/create-balance';

export interface BalanceInput {
    accountId: string;
    month: Months;
    year: number;
    value: number;
}

const getCurrentBalances = async (userId: string): Promise<CurrentBalancesMapped> => {
    const dateInfo: DateInfo = {
        month: getCurrentMonthName(),
        year: getCurrentYear(),
    };

    const currentBalances: Array<Balance> = await findCurrentBalancesByUser(userId, dateInfo);

    const mappedBalances: CurrentBalancesMapped = mapperCurrentBalances(currentBalances, dateInfo);

    return mappedBalances;
};

const create = async (balanceInput: BalanceInput): Promise<BalanceMapped> => {
    try {
        const account = await findAccountById(balanceInput.accountId);

        const balanceCreation: BalanceCreation = {
            account,
            month: balanceInput.month,
            year: balanceInput.year,
            value: balanceInput.value,
        };

        const balance: Balance = await createBalance(balanceCreation);

        const balanceMapped: BalanceMapped = mapperCreatedBalance(balance);

        return balanceMapped;
    } catch (err) {
        throw extendedError({ error: err as Error, type: ErrorType.CREATE_BALANCE_ERROR });
    }
};

export default { create, getCurrentBalances };
