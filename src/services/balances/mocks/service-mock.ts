import mongoose from 'mongoose';

import { Account } from '../../../database/models/Account';
import { Balance } from '../../../database/models/Balance';
import { AccountType } from '../../../utils/enums/accounts';
import { CurrentBalanceTypes } from '../../../utils/enums/balances';
import { Months } from '../../../utils/enums/date';
import { CurrentBalancesMapped } from '../mapper';

// GetCurrentBalances Mocks

const currentBalancesMock: Array<Balance> = [
    {
        _id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
        account: {
            _id: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
            name: 'Conta 1',
            type: AccountType.CHECKING_ACCOUNT,
            isMain: true,
            user: {
                _id: new mongoose.Schema.Types.ObjectId('63d159109ad982563932543c'),
                name: 'User 1',
                email: 'email@email.com',
            },
        },
        month: Months.JANUARY,
        year: 2023,
        value: 230.1,
    },
];

const mappedBalancesResult: CurrentBalancesMapped = {
    month: Months.JANUARY,
    year: 2023,
    accounts: [
        {
            id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
            accountId: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
            name: 'Conta 1',
            type: CurrentBalanceTypes.ACCOUNT,
            value: 230.1,
            isMain: true,
        },
    ],
    investments: [],
};

// Create Mocks

const accountMock: Account = {
    _id: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
    name: 'Conta A',
    type: AccountType.CHECKING_ACCOUNT,
    isMain: true,
    user: {
        _id: new mongoose.Schema.Types.ObjectId('63d1951f02987b243e9102cf'),
        name: 'Vinícius Rocha',
        email: 'email@contato.com',
    },
};

const balanceMock: Balance = {
    _id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
    account: {
        _id: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
        name: 'Conta A',
        type: AccountType.CHECKING_ACCOUNT,
        isMain: true,
        user: {
            _id: new mongoose.Schema.Types.ObjectId('63d1951f02987b243e9102cf'),
            name: 'Vinícius Rocha',
            email: 'email@contato.com',
        },
    },
    month: Months.APRIL,
    year: 2022,
    value: 390.39,
};

export { currentBalancesMock, mappedBalancesResult, accountMock, balanceMock };
