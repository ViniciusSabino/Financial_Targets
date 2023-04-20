import { Account } from '../../../database/models/Account';
import BalanceModel, { Balance } from '../../../database/models/Balance';
import { Months } from '../../../utils/enums/date';

export interface BalanceCreation {
    id?: string;
    account?: Account;
    month?: Months;
    year?: number;
    value?: number;
}

const createOrUpdateBalance = async (balanceCreation: BalanceCreation): Promise<Balance> => {
    const balance = await BalanceModel.findOneAndUpdate<Balance>(
        {
            _id: balanceCreation.id,
        },
        {
            account: balanceCreation.account,
            month: balanceCreation.month,
            year: balanceCreation.year,
            value: balanceCreation.value,
        },
        {
            new: true,
            upsert: true,
        }
    ).lean();

    return balance;
};

export default createOrUpdateBalance;
