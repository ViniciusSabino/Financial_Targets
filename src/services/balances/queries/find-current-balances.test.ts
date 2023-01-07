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

            const currentBalancesMock = [
                {
                    account: {
                        _id: '123',
                        name: 'Conta 1',
                        type: AccountType.CHECKING_ACCOUNT,
                        isMain: true,
                        user: {
                            _id: '321',
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                        month: Months.JANUARY,
                        year: 2023,
                        value: 230.1,
                    },
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
