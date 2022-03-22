import { Account } from '../../database/models/Account';
import BalanceModel, { Balance } from '../../database/models/Balance';
import { Months } from '../../utils/enums/date';
import { DateInfo } from '../../utils/helpers/date';

export interface BalanceCreation {
    account: Account;
    month: Months;
    year: number;
    value: number;
}

const findCurrentBalancesByUser = async (userId: string, dateInfo: DateInfo): Promise<Array<Balance>> => {
    const { month, year } = dateInfo;

    const currentBalances = await BalanceModel.find({ month, year })
        .populate({ path: 'account', match: { user: userId } })
        .lean();

    return currentBalances as Array<Balance>;
};

const createBalance = async (balanceCreation: BalanceCreation): Promise<Balance> => {
    const model = new BalanceModel(balanceCreation);

    const createdBalance = await model.save();

    return createdBalance;
};

export { createBalance, findCurrentBalancesByUser };
