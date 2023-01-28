import mongoose from 'mongoose';

import { User } from '../../database/models/User';
import { BalanceMapped, CurrentBalancesMapped } from '../../services/balances/mapper';
import { CurrentBalanceTypes } from '../../utils/enums/balances';
import { Months } from '../../utils/enums/date';

// GET - current mocks

const userMock: User = {
    _id: new mongoose.Schema.Types.ObjectId('62019c68cfdad112f35788e4'),
    name: 'User 1',
    email: 'email@email.com',
};

const currentBalancesMock: CurrentBalancesMapped = {
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

const currentBalancesResponse = {
    month: Months.JANUARY,
    year: 2023,
    accounts: [
        {
            id: {
                path: '63b9cc70705a4a72ced3f5d3',
                instance: 'ObjectID',
                validators: [],
                getters: [],
                setters: [],
                _presplitPath: ['63b9cc70705a4a72ced3f5d3'],
                options: {},
                _index: null,
            },
            accountId: {
                path: '63b9cc77f18245c1e38e9f13',
                instance: 'ObjectID',
                validators: [],
                getters: [],
                setters: [],
                _presplitPath: ['63b9cc77f18245c1e38e9f13'],
                options: {},
                _index: null,
            },
            name: 'Conta 1',
            type: CurrentBalanceTypes.ACCOUNT,
            value: 230.1,
            isMain: true,
        },
    ],
    investments: [],
};

// POST - create mocks

const createdBalanceResult = {
    id: {
        path: '63b9cc70705a4a72ced3f5d3',
        instance: 'ObjectID',
        validators: [],
        getters: [],
        setters: [],
        _presplitPath: ['63b9cc70705a4a72ced3f5d3'],
        options: {},
        _index: null,
    },
    accountId: {
        path: '63b9cc77f18245c1e38e9f13',
        instance: 'ObjectID',
        validators: [],
        getters: [],
        setters: [],
        _presplitPath: ['63b9cc77f18245c1e38e9f13'],
        options: {},
        _index: null,
    },
    month: Months.JANUARY,
    year: 2023,
    value: 293.0,
};

export { userMock, currentBalancesMock, currentBalancesResponse, createdBalanceResult };
