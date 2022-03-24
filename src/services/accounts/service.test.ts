/* eslint-disable max-lines */

import { AccountType } from '../../utils/enums/accounts';
import service, { CheckingAccount } from './service';
import { User } from '../../database/models/User';
import { Account } from '../../database/models/Account';
import { AccountMapped, mapperAccounts } from './mapper';
import { findUserById } from '../common/user/queries';
import { createAccount, getAllAccounts } from './queries';

jest.mock('../common/user/queries', () => ({
    findUserById: jest.fn(),
}));

jest.mock('./queries', () => ({
    createAccount: jest.fn(),
    getAllAccounts: jest.fn(),
}));

jest.mock('./mapper', () => ({
    mapperAccounts: jest.fn(),
}));

const findUserByIdMock = findUserById as jest.Mock;

const createAccountMock = createAccount as jest.Mock;
const getAllAccountsMock = getAllAccounts as jest.Mock;

const mapperAccountsMock = mapperAccounts as jest.Mock;

describe('Services/Accounts', () => {
    describe('Service', () => {
        test('createCheckingAccount', async () => {
            const userId = '123';
            const checkingAccount: CheckingAccount = {
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
            };

            const user: User = { _id: '12', name: 'Teste 1', email: 'teste1@teste' };

            const createdAccount: Account = {
                _id: '123',
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: { _id: '12', name: 'User 1', email: 'teste1@example.com' },
            };
            const mappedAccount: AccountMapped = {
                id: '123',
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: '12',
            };

            findUserByIdMock.mockResolvedValue(user);
            createAccountMock.mockResolvedValue(createdAccount);
            mapperAccountsMock.mockImplementation(() => mappedAccount);

            const createdAccountMapped = await service.createCheckingAccount(userId, checkingAccount);

            expect(findUserByIdMock).toHaveBeenCalledWith(userId);
            expect(createAccountMock).toHaveBeenCalledWith({ ...checkingAccount, user });
            expect(mapperAccountsMock).toHaveBeenCalledWith(createdAccount);

            expect(createdAccountMapped).toStrictEqual(mappedAccount);
        });

        test('listAllAccounts', async () => {
            const userId = '1';

            const user: User = { _id: '12', name: 'Teste 1', email: 'teste1@teste' };

            const allAccounts: Array<Account> = [
                {
                    _id: '123',
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: { _id: '12', name: 'User 1', email: 'teste1@example.com' },
                },
                {
                    _id: '321',
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    user: { _id: '34', name: 'User 2', email: 'teste2@example.com' },
                },
            ];

            const accountsMapped: Array<AccountMapped> = [
                {
                    id: '123',
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    userId: '12',
                },
                {
                    id: '321',
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    userId: '34',
                },
            ];

            findUserByIdMock.mockResolvedValue(user);
            getAllAccountsMock.mockResolvedValue(allAccounts);
            mapperAccountsMock.mockImplementation(() => accountsMapped);

            const response = await service.listAllAccounts(userId);

            expect(findUserByIdMock).toHaveBeenCalledWith(userId);
            expect(getAllAccountsMock).toHaveBeenCalledWith(user);
            expect(mapperAccountsMock).toHaveBeenCalledWith(allAccounts);

            expect(response).toStrictEqual(accountsMapped);
        });
    });
});
