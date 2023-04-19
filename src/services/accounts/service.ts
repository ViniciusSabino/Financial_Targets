import { findUserById } from '../common/user/queries';
import { AccountType } from '../../utils/enums/accounts';
import query, { AccountCreation } from './queries';
import { AccountMapped, mapAccount, mapAccounts } from './mapper';

export interface CheckingAccount {
    name: string;
    type: AccountType;
    isMain: boolean;
}

const createCheckingAccount = async (checkingAccount: CheckingAccount, userId: string): Promise<AccountMapped> => {
    const user = await findUserById(userId);

    const accountCreation: AccountCreation = { ...checkingAccount, user };

    const account = await query.create(accountCreation);

    return mapAccount(account);
};

const listAllAccounts = async (userId: string): Promise<Array<AccountMapped>> => {
    const user = await findUserById(userId);

    const accounts = await query.getAll(user);

    const accountsMapped = mapAccounts(accounts);

    return accountsMapped;
};

export default { createCheckingAccount, listAllAccounts };
