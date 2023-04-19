import AccountModel, { Account } from '../../database/models/Account';
import { User } from '../../database/models/User';
import { AccountType } from '../../utils/enums/accounts';

export interface AccountCreation {
    name: string;
    type: AccountType;
    isMain: boolean;
    user: User;
}

const create = async (accountCreation: AccountCreation): Promise<Account> => {
    const model = new AccountModel(accountCreation);

    const createdAccount = await model.save();

    return createdAccount;
};

const getAll = async (user: User): Promise<Array<Account>> => {
    const accounts: Array<Account> = await AccountModel.find({ user }).lean();

    return accounts;
};

const findById = async (id: string): Promise<Account> => {
    const account = await AccountModel.findById(id).lean();

    return account as Account;
};

export default { create, getAll, findById };
