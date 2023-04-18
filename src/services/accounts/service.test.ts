/* eslint-disable max-lines */

import { ObjectId } from 'mongodb';

import { AccountType } from '../../utils/enums/accounts';
import service, { CheckingAccount } from './service';
import { User } from '../../database/models/User';
import { Account } from '../../database/models/Account';
import { AccountMapped, mapAccounts, mapAccount } from './mapper';
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
    mapAccount: jest.fn(),
    mapAccounts: jest.fn(),
}));

const findUserByIdMock = findUserById as jest.Mock;

const createAccountMock = createAccount as jest.Mock;
const getAllAccountsMock = getAllAccounts as jest.Mock;

const mapAccountMock = mapAccount as jest.Mock;
const mapAccountsMock = mapAccounts as jest.Mock;

describe('Services/Accounts', () => {
    describe('Service', () => {
        test('createCheckingAccount', async () => {
            const userId = '123';
            const checkingAccount: CheckingAccount = {
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
            };

            const user: User = {
                _id: new ObjectId('62019c68cfdad112f35788e4'),
                name: 'Teste 1',
                email: 'teste1@teste',
            };

            const createdAccount: Account = {
                _id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: { _id: new ObjectId('62019c68cfdad112f35788e4'), name: 'User 1', email: 'teste1@example.com' },
            };

            const mappedAccount: AccountMapped = {
                id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: new ObjectId('62019c68cfdad112f35788e4'),
            };

            findUserByIdMock.mockResolvedValue(user);
            createAccountMock.mockResolvedValue(createdAccount);
            mapAccountMock.mockImplementation(() => mappedAccount);

            const createdAccountMapped = await service.createCheckingAccount(checkingAccount, userId);

            expect(findUserByIdMock).toHaveBeenCalledWith(userId);
            expect(createAccountMock).toHaveBeenCalledWith({ ...checkingAccount, user });
            expect(mapAccountMock).toHaveBeenCalledWith(createdAccount);

            expect(createdAccountMapped).toStrictEqual(mappedAccount);
        });

        test('listAllAccounts', async () => {
            const userId = '1';

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

            const accountsMapped: Array<AccountMapped> = [
                {
                    id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    userId: new ObjectId('62019c68cfdad112f35788e4'),
                },
                {
                    id: new ObjectId('642b271e4ac7dac0aa4ce3e8'),
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    userId: new ObjectId('62019c68cfdad112f35788e4'),
                },
            ];

            findUserByIdMock.mockResolvedValue(user);
            getAllAccountsMock.mockResolvedValue(allAccounts);
            mapAccountsMock.mockImplementation(() => accountsMapped);

            const response = await service.listAllAccounts(userId);

            expect(findUserByIdMock).toHaveBeenCalledWith(userId);
            expect(getAllAccountsMock).toHaveBeenCalledWith(user);
            expect(mapAccountsMock).toHaveBeenCalledWith(allAccounts);

            expect(response).toStrictEqual(accountsMapped);
        });
    });
});
