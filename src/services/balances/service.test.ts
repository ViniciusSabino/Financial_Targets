import mongoose from 'mongoose';

import { Months } from '../../utils/enums/date';
import ErrorType from '../../utils/enums/errorType';
import * as error from '../../utils/errors/extendedError';
import * as mapper from './mapper';
import { accountMock, balanceMock, currentBalancesMock, mappedBalancesResult } from './mocks/service-mock';

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
        test('GetCurrentBalances', async () => {
            const userId = '63d159109ad982563932543c';

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

            expect(mappedBalances).toEqual(mappedBalancesResult);
        });

        test('Create', async () => {
            const balanceInput: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
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

        test('Create with create-balance-error', async () => {
            const balanceInput: BalanceInput = {
                accountId: '63b9cc77f18245c1e38e9f13',
                month: Months.APRIL,
                year: 2022,
                value: 390.39,
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
