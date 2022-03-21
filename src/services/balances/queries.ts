import { Account } from '../../database/models/Account';
import BalanceModel, { Balance } from '../../database/models/Balance';
import { User } from '../../database/models/User';
import { Months } from '../../utils/enums/date';
import { getCurrentMonthName, getCurrentYear } from '../../utils/helpers/date';

export interface BalanceCreation {
    account: Account;
    month: Months;
    year: number;
    value: number;
}

const findCurrentBalancesByUser = async (userId: string): Promise<Array<Balance>> => {
    const year = getCurrentYear();
    const monthName = getCurrentMonthName();

    const currentBalances = await BalanceModel.find({ month: monthName, year })
        .populate({ path: 'account', match: { user: userId, isMain: true } })
        .lean();

    return currentBalances as Array<Balance>;
};

const createBalance = async (balanceCreation: BalanceCreation): Promise<Balance> => {
    const model = new BalanceModel(balanceCreation);

    const createdBalance = await model.save();

    return createdBalance;
};

export { createBalance, findCurrentBalancesByUser };
