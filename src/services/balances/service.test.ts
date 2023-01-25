/* eslint-disable max-lines */
import mongoose from 'mongoose';

import { Account } from '../../database/models/Account';
import { Balance } from '../../database/models/Balance';
import { AccountType } from '../../utils/enums/accounts';
import { CurrentBalanceTypes } from '../../utils/enums/balances';
import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import * as error from '../../utils/errors/extendedError';
import * as mapper from './mapper';

const findCurrentBalancesByUserFn = jest.fn();
const findAccountByIdFn = jest.fn();
const createBalanceFn = jest.fn();

jest.mock('../../utils/helpers/date', () => ({
    getCurrentMonthName: jest.fn(() => Months.JANUARY),
    getCurrentYear: jest.fn(() => 2023),
}));

jest.mock('./queries', () => ({
    findCurrentBalancesByUser: findCurrentBalancesByUserFn,
    createBalance: createBalanceFn,
}));

jest.mock('../accounts/queries', () => ({
    findAccountById: findAccountByIdFn,
}));

import service, { BalanceInput } from './service';

describe('Services/Balances', () => {
    describe('Service', () => {
        test('getCurrentBalances', async () => {
            const userId = '63d159109ad982563932543c';

            const currentBalancesMock: Array<Balance> = [
                {
                    _id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
                    account: {
                        _id: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
                        name: 'Conta 1',
                        type: AccountType.CHECKING_ACCOUNT,
                        isMain: true,
                        user: {
                            _id: new mongoose.Schema.Types.ObjectId(userId),
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                    },
                    month: Months.JANUARY,
                    year: 2023,
                    value: 230.1,
                },
            ];

            findCurrentBalancesByUserFn.mockResolvedValue(currentBalancesMock);
            const mapperCurrentBalancesSpy = jest.spyOn(mapper, 'mapperCurrentBalances');

            const mappedBalances: mapper.CurrentBalancesMapped = await service.getCurrentBalances(userId);

            expect(findCurrentBalancesByUserFn).toHaveBeenCalledWith(userId, {
                month: Months.JANUARY,
                year: 2023,
            });
            expect(mapperCurrentBalancesSpy).toHaveBeenCalledWith(currentBalancesMock, {
                month: Months.JANUARY,
                year: 2023,
            });

            expect(mappedBalances).toEqual({
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
            });
        });

        test('create', async () => {
            const balanceInput: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            };

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

            findAccountByIdFn.mockResolvedValue(accountMock);
            createBalanceFn.mockResolvedValue(balanceMock);
            const mapperCreatedBalanceSpy = jest.spyOn(mapper, 'mapperCreatedBalance');

            const balanceMapped = await service.create(balanceInput);

            expect(findAccountByIdFn).toHaveBeenCalledWith(balanceInput.accountId);
            expect(mapperCreatedBalanceSpy).toHaveBeenCalledWith(balanceMock);
            expect(balanceMapped).toEqual({
                id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
                accountId: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            });
        });

        test('create => CREATE_BALANCE_ERROR', async () => {
            const balanceInput: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            };

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

            findAccountByIdFn.mockResolvedValue(accountMock);
            createBalanceFn.mockRejectedValue(new Error('Error Create'));
            const mapperCreatedBalanceSpy = jest.spyOn(mapper, 'mapperCreatedBalance');
            const extendedErrorSpy = jest.spyOn(error, 'default');

            await expect(service.create(balanceInput)).rejects.toThrowError('Error Create');

            expect(extendedErrorSpy).toHaveBeenCalledWith({
                error: Error('Error Create'),
                type: ErrorType.CREATE_BALANCE_ERROR,
            });
            expect(findAccountByIdFn).toHaveBeenCalledWith(balanceInput.accountId);
            expect(mapperCreatedBalanceSpy).not.toBeCalled();
        });
    });
});
