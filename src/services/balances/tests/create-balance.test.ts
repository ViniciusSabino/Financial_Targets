import { ObjectId } from 'mongodb';

import { AccountType } from '../../../utils/enums/accounts';
import { Months } from '../../../utils/enums/date';

const saveFn = jest.fn();

jest.mock('../../../database/models/Balance', () =>
    jest.fn().mockImplementation(() => ({
        save: saveFn,
    }))
);

import Model, { Balance } from '../../../database/models/Balance';
import createBalance, { BalanceCreation } from '../queries/create-balance';

describe('Services/Balances', () => {
    describe('Queries', () => {
        test('createBalance', async () => {
            const balanceCreation: BalanceCreation = {
                account: {
                    _id: new ObjectId('63b9ccddded659502ab36160'),
                    name: 'Conta 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('63b9cce3158260fda43aed5b'),
                        name: 'User 1',
                        email: 'email@email.com',
                    },
                },
                month: Months.JANUARY,
                year: 2023,
                value: 123.39,
            };

            const createdBalanceMock: Balance = {
                _id: new ObjectId('63b9ccddded659502ab36160'),
                account: {
                    _id: new ObjectId('63b9ccddded659502ab36160'),
                    name: 'Conta 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('63b9cce3158260fda43aed5b'),
                        name: 'User 1',
                        email: 'email@email.com',
                    },
                },
                month: Months.JANUARY,
                year: 2023,
                value: 123.39,
            };

            saveFn.mockResolvedValue(createdBalanceMock);

            const createdBalance = await createBalance(balanceCreation);

            expect(Model).toHaveBeenCalledWith(balanceCreation);
            expect(saveFn).toHaveBeenCalled();
            expect(createdBalance).toEqual(createdBalanceMock);
        });
    });
});
