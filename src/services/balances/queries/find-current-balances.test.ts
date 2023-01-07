import mongoose from 'mongoose';

import { Balance } from '../../../database/models/Balance';
import { AccountType } from '../../../utils/enums/accounts';
import { Months } from '../../../utils/enums/date';
import { DateInfo } from '../../../utils/helpers/date';

const leanFn = jest.fn();

const populateFn = jest.fn(() => ({
    lean: leanFn,
}));

const findFn = jest.fn(() => ({
    populate: populateFn,
}));

jest.mock('../../../database/models/Balance', () => ({
    find: findFn,
}));

import findCurrentBalancesByUser from './find-current-balances';

describe('Services/Balances', () => {
    describe('Queries', () => {
        test('findCurrentBalancesByUser', async () => {
            const userId = '1234';
            const dateInfo: DateInfo = {
                month: Months.JANUARY,
                year: 2023,
            };

            const currentBalancesMock: Array<Balance> = [
                {
                    _id: new mongoose.Schema.Types.ObjectId('63b9cc70705a4a72ced3f5d3'),
                    account: {
                        _id: new mongoose.Schema.Types.ObjectId('63b9cc77f18245c1e38e9f13'),
                        name: 'Conta 1',
                        type: AccountType.CHECKING_ACCOUNT,
                        isMain: true,
                        user: {
                            _id: new mongoose.Schema.Types.ObjectId('63b9cc7ddb6efa02347ffd5c'),
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                    },
                    month: Months.JANUARY,
                    year: 2023,
                    value: 230.1,
                },
            ];

            leanFn.mockResolvedValue(currentBalancesMock);

            const currentBalances = await findCurrentBalancesByUser(userId, dateInfo);

            expect(findFn).toHaveBeenCalledWith({ month: dateInfo.month, year: dateInfo.year });
            expect(populateFn).toHaveBeenCalledWith({ path: 'account', match: { user: userId } });
            expect(leanFn).toBeCalled();
            expect(currentBalances).toEqual(currentBalancesMock);
        });
    });
});
