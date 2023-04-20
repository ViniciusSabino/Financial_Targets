/* eslint-disable jest/no-conditional-expect */
/* eslint-disable no-undefined */
/* eslint-disable max-lines */

import { ObjectId } from 'mongodb';

import { AccountType } from '../../utils/enums/accounts';
import { CurrentBalanceTypes } from '../../utils/enums/balances';
import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import HttpStatus from '../../utils/enums/httpStatus';
import { ExtendedError } from '../../utils/errors/apiError';
import * as mapper from './mapper';

const findCurrentBalancesByUserFn = jest.fn();
const findAccountByIdFn = jest.fn();
const createBalanceFn = jest.fn();

jest.mock('../../utils/helpers/date', () => ({
    getCurrentMonthName: jest.fn(() => Months.JANUARY),
    getCurrentYear: jest.fn(() => 2023),
}));

jest.mock('./queries', () => ({
    findCurrentByUser: findCurrentBalancesByUserFn,
    createOrUpdate: createBalanceFn,
}));

jest.mock('../accounts/queries', () => ({
    findById: findAccountByIdFn,
}));

import service, { BalanceInput } from './service';

describe('Services/Balances', () => {
    describe('Service', () => {
        test('GetCurrentBalances', async () => {
            const userId = '63d159109ad982563932543c';

            findCurrentBalancesByUserFn.mockResolvedValue([
                {
                    _id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                    account: {
                        _id: new ObjectId('63b9cc77f18245c1e38e9f13'),
                        name: 'Conta 1',
                        type: AccountType.CHECKING_ACCOUNT,
                        isMain: true,
                        user: {
                            _id: new ObjectId('63d159109ad982563932543c'),
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                    },
                    month: Months.JANUARY,
                    year: 2023,
                    value: 230.1,
                },
            ]);
            const mapperCurrentBalancesSpy = jest.spyOn(mapper, 'mapperCurrentBalances');

            const mappedBalances: mapper.CurrentBalancesMapped = await service.getCurrentBalances(userId);

            expect(findCurrentBalancesByUserFn).toHaveBeenCalledWith(userId, {
                month: Months.JANUARY,
                year: 2023,
            });
            expect(mapperCurrentBalancesSpy).toHaveBeenCalledWith(
                [
                    {
                        _id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                        account: {
                            _id: new ObjectId('63b9cc77f18245c1e38e9f13'),
                            name: 'Conta 1',
                            type: AccountType.CHECKING_ACCOUNT,
                            isMain: true,
                            user: {
                                _id: new ObjectId('63d159109ad982563932543c'),
                                name: 'User 1',
                                email: 'email@email.com',
                            },
                        },
                        month: Months.JANUARY,
                        year: 2023,
                        value: 230.1,
                    },
                ],
                {
                    month: Months.JANUARY,
                    year: 2023,
                }
            );

            expect(mappedBalances).toEqual({
                month: Months.JANUARY,
                year: 2023,
                accounts: [
                    {
                        id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                        accountId: new ObjectId('63b9cc77f18245c1e38e9f13'),
                        name: 'Conta 1',
                        type: CurrentBalanceTypes.ACCOUNT,
                        value: 230.1,
                        isMain: true,
                    },
                ],
                investments: [],
            });
        });

        test('Create: should properly create a balance', async () => {
            const balanceInput: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            };

            findAccountByIdFn.mockResolvedValue({
                _id: new ObjectId('63b9cc77f18245c1e38e9f13'),
                name: 'Conta A',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: {
                    _id: new ObjectId('63d1951f02987b243e9102cf'),
                    name: 'Vinícius Rocha',
                    email: 'email@contato.com',
                },
            });
            createBalanceFn.mockResolvedValue({
                _id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                account: {
                    _id: new ObjectId('63b9cc77f18245c1e38e9f13'),
                    name: 'Conta A',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('63d1951f02987b243e9102cf'),
                        name: 'Vinícius Rocha',
                        email: 'email@contato.com',
                    },
                },
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            });
            const mapperCreatedBalanceSpy = jest.spyOn(mapper, 'mapperCreatedBalance');

            const balanceMapped = await service.create(balanceInput);

            expect(findAccountByIdFn).toHaveBeenCalledWith(balanceInput.accountId);
            expect(mapperCreatedBalanceSpy).toHaveBeenCalledWith({
                _id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                account: {
                    _id: new ObjectId('63b9cc77f18245c1e38e9f13'),
                    name: 'Conta A',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('63d1951f02987b243e9102cf'),
                        name: 'Vinícius Rocha',
                        email: 'email@contato.com',
                    },
                },
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            });
            expect(balanceMapped).toEqual({
                id: new ObjectId('63b9cc70705a4a72ced3f5d3'),
                accountId: new ObjectId('63b9cc77f18245c1e38e9f13'),
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            });
        });

        test('Create: should return an error if an id for balance (editing) and an account (creation) is not informed', async () => {
            const balanceInput: BalanceInput = {
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
            };

            findAccountByIdFn.mockResolvedValue(null);

            const mapperCreatedBalanceSpy = jest.spyOn(mapper, 'mapperCreatedBalance');

            try {
                await service.create(balanceInput);
            } catch (err) {
                const error = err as ExtendedError;
                expect(error.message).toEqual('Account is invalid');
                expect(error.type).toEqual(ErrorType.CREATE_BALANCE_ERROR);
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }

            expect(mapperCreatedBalanceSpy).not.toBeCalled();
            expect(findAccountByIdFn).toHaveBeenCalledWith('');
        });
    });
});
