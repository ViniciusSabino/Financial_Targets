import { findUserById } from '../common/user/queries';
import { AccountType } from '../../utils/enums/accounts';
import { AccountCreation, createAccount, getAllAccounts } from './queries';
import { AccountMapped, mapperAccounts } from './mapper';

export interface CheckingAccount {
    name: string;
    type: AccountType;
    isMain: boolean;
}

const createCheckingAccount = async (
    userId: string,
    checkingAccount: CheckingAccount
): Promise<AccountMapped | Array<AccountMapped>> => {
    const user = await findUserById(userId);

    const accountCreation: AccountCreation = { ...checkingAccount, user };

    const createdAccount = await createAccount(accountCreation);

    const createdAccountMapped = mapperAccounts(createdAccount);

    return createdAccountMapped;
};

const listAllAccounts = async (userId: string): Promise<Array<AccountMapped> | AccountMapped> => {
    const user = await findUserById(userId);

    const accounts = await getAllAccounts(user);

    const accountsMapped = mapperAccounts(accounts);

    return accountsMapped;
};

export default { createCheckingAccount, listAllAccounts };
