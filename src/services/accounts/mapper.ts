import { Account } from '../../database/models/Account';
import { AccountType } from '../../utils/enums/accounts';

export interface AccountMapped {
    id: string;
    name: string;
    type: AccountType;
    isMain: boolean;
    userId: string;
}

const mapperAccounts = (input: Array<Account> | Account): Array<AccountMapped> | AccountMapped => {
    const mapAccount = (account: Account) => ({
        id: account._id,
        name: account.name,
        type: account.type,
        isMain: account.isMain,
        userId: account.user._id,
    });

    if (Array.isArray(input)) return input.map((account) => mapAccount(account));

    return mapAccount(input);
};

export { mapperAccounts };
