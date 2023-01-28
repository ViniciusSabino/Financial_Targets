import { ObjectId } from 'mongoose';

import { Account } from '../../database/models/Account';
import { AccountType } from '../../utils/enums/accounts';

export interface AccountMapped {
    id: ObjectId;
    name: string;
    type: AccountType;
    isMain: boolean;
    userId: ObjectId;
}

const mapAccount = (account: Account): AccountMapped => ({
    id: account._id,
    name: account.name,
    type: account.type,
    isMain: account.isMain,
    userId: account.user._id,
});

const mapAccounts = (accounts: Array<Account>): Array<AccountMapped> => accounts.map((account) => mapAccount(account));

export { mapAccount, mapAccounts };
