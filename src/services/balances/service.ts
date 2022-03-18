import { Months } from '../../utils/enums/date';
import { findAccountById } from '../accounts/queries';
import { BalanceCreation, createBalance } from './queries';

export interface BalanceEntries {
    accountId: string;
    month: Months;
    year: number;
    value: number;
}

const create = async (balanceEntries: BalanceEntries) => {
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
    } catch (err) {}
};

export default { create };
