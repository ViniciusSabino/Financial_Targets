import { findUserById } from '../common/user/queries';
import { AccountType } from '../../utils/enums/accounts';
import { Account } from '../../database/models/Account';
import { AccountCreation, createAccount, getAllAccounts } from './queries';

export interface CheckingAccount {
    name: string;
    type: AccountType;
    isMain: boolean;
}

const createCheckingAccount = async (userId: string, checkingAccount: CheckingAccount): Promise<Account> => {
    const user = await findUserById(userId);

    const accountCreation: AccountCreation = { ...checkingAccount, user };

    const createdAccount = await createAccount(accountCreation);

    return createdAccount;
};

const listAllAccounts = async (userId: string): Promise<Array<Account>> => {
    const user = await findUserById(userId);

    const accounts = await getAllAccounts(user);

    return accounts;
};

export default { createCheckingAccount, listAllAccounts };
