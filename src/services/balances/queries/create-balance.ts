import { Account } from '../../../database/models/Account';
import Model, { Balance } from '../../../database/models/Balance';
import { Months } from '../../../utils/enums/date';

export interface BalanceCreation {
    account: Account;
    month: Months;
    year: number;
    value: number;
}

const createBalance = async (balanceCreation: BalanceCreation): Promise<Balance> => {
    const model = new Model(balanceCreation);

    const createdBalance = await model.save();

    return createdBalance;
};

export default createBalance;
