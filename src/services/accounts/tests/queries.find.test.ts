/* eslint-disable max-lines */

import { ObjectId } from 'mongodb';

import { User } from '../../../database/models/User';
import { AccountType } from '../../../utils/enums/accounts';

const leanFn = jest.fn();
const findFn = jest.fn(() => ({ lean: leanFn }));
const findByIdFn = jest.fn(() => ({ lean: leanFn }));

jest.mock('../../../database/models/Account', () => ({
    find: findFn,
    findById: findByIdFn,
}));

import { Account } from '../../../database/models/Account';
import query from '../queries';

describe('Services/Accounts', () => {
    describe('Queries', () => {
        test('getAll', async () => {
            const user: User = {
                _id: new ObjectId('62019c68cfdad112f35788e4'),
                name: 'Teste 1',
                email: 'teste1@teste',
            };
            const allAccounts: Array<Account> = [
                {
                    _id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('62019c68cfdad112f35788e4'),
                        name: 'User 1',
                        email: 'teste1@example.com',
                    },
                },
                {
                    _id: new ObjectId('642b271e4ac7dac0aa4ce3e8'),
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('62019c68cfdad112f35788e4'),
                        name: 'User 1',
                        email: 'teste1@example.com',
                    },
                },
            ];

            leanFn.mockResolvedValue(allAccounts);

            const accounts = await query.getAll(user);
            expect(findFn).toHaveBeenCalledWith({ user });
            expect(leanFn).toHaveBeenCalled();
            expect(accounts).toEqual(allAccounts);
        });

        test('findById', async () => {
            const id = '642b271e4ac7dac0aa4ce3e9';
            const accountMock: Account = {
                _id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: {
                    _id: new ObjectId('62019c68cfdad112f35788e4'),
                    name: 'User 1',
                    email: 'teste1@example.com',
                },
            };

            leanFn.mockResolvedValue(accountMock);

            const account = await query.findById(id);
            expect(findByIdFn).toHaveBeenCalledWith(id);
            expect(leanFn).toHaveBeenCalled();
            expect(account).toEqual(accountMock);
        });
    });
});
