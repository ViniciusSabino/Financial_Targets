import { Balance } from '../../database/models/Balance';
import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import extendedError from '../../utils/errors/extendedError';
import { findAccountById } from '../accounts/queries';
import { findUserById } from '../common/user/queries';
import { BalanceCreation, createBalance, findCurrentBalancesByUser } from './queries';

export interface BalanceEntries {
    accountId: string;
    month: Months;
    year: number;
    value: number;
}

const getCurrentBalances = async (userId: string): Promise<Array<Balance>> => {
    const curretBalances = await findCurrentBalancesByUser(userId);

    return curretBalances;
};

const create = async (balanceEntries: BalanceEntries): Promise<Balance> => {
    try {
        const account = await findAccountById(balanceEntries.accountId);

        const balanceCreation: BalanceCreation = {
            account,
            month: balanceEntries.month,
            year: balanceEntries.year,
            value: balanceEntries.value,
        };

        const balance = await createBalance(balanceCreation);

        return balance;
    } catch (err) {
        throw extendedError({ error: err as Error, type: ErrorType.CREATE_BALANCE_ERROR });
    }
};

export default { create, getCurrentBalances };
