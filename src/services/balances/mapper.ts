import { ObjectId } from 'mongodb';

import { Balance } from '../../database/models/Balance';
import { AccountType } from '../../utils/enums/accounts';
import { CurrentBalanceTypes } from '../../utils/enums/balances';
import { Months } from '../../utils/enums/date';
import { DateInfo } from '../../utils/helpers/date';

interface AccountMapped {
    id: ObjectId;
    accountId: ObjectId;
    name: string;
    type: CurrentBalanceTypes;
    value: number;
    isMain: boolean;
}

export interface CurrentBalancesMapped {
    month: Months;
    year: number;
    accounts: Array<AccountMapped>;
    investments: Array<AccountMapped>;
}

export interface BalanceMapped {
    id: ObjectId;
    accountId: ObjectId;
    month: Months;
    year: number;
    value: number;
}

const mapperCurrentBalances = (currentBalances: Array<Balance>, dateInfo: DateInfo): CurrentBalancesMapped => {
    const mapAccountDetails = (balance: Balance): AccountMapped => ({
        id: balance._id,
        accountId: balance.account._id,
        name: balance.account.name,
        type:
            balance.account.type === AccountType.INVESTMENT
                ? CurrentBalanceTypes.INVESTMENT
                : CurrentBalanceTypes.ACCOUNT,
        value: balance.value,
        isMain: balance.account.isMain,
    });

    return {
        month: dateInfo.month,
        year: dateInfo.year,
        accounts: currentBalances
            .filter((current) => current.account.type === AccountType.CHECKING_ACCOUNT)
            .map((balance) => mapAccountDetails(balance)),
        investments: currentBalances
            .filter((current) => current.account.type === AccountType.INVESTMENT)
            .map((balance) => mapAccountDetails(balance)),
    };
};

const mapperCreatedBalance = (balance: Balance): BalanceMapped => ({
    id: balance._id,
    accountId: balance.account._id,
    month: balance.month,
    year: balance.year,
    value: balance.value,
});

export { mapperCurrentBalances, mapperCreatedBalance };
