/* eslint-disable max-lines */

import { ObjectId } from 'mongodb';

import { AccountType } from '../../../utils/enums/accounts';

const saveFn = jest.fn();
const mockAccount = jest.fn().mockImplementation(() => ({ save: saveFn }));

jest.mock('../../../database/models/Account', () => ({
    ...jest.requireActual('../../../database/models/Account'),
    __esModule: true,
    default: mockAccount,
}));

import { Account } from '../../../database/models/Account';
import query, { AccountCreation } from '../queries';

describe('Services/Accounts', () => {
    describe('Queries', () => {
        test('create', async () => {
            const accountCreation: AccountCreation = {
                name: 'Account 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: {
                    _id: new ObjectId('62019c68cfdad112f35788e4'),
                    name: 'Teste 1',
                    email: 'teste1@teste',
                },
            };

            const createdAccount: Account = {
                _id: new ObjectId('642b271e4ac7dac0aa4ce3e9'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: { _id: new ObjectId('62019c68cfdad112f35788e4'), name: 'User 1', email: 'teste1@example.com' },
            };

            saveFn.mockResolvedValue(createdAccount);

            const account = await query.create(accountCreation);
            expect(mockAccount).toHaveBeenCalledWith(accountCreation);
            expect(saveFn).toHaveBeenCalled();
            expect(account).toEqual(createdAccount);
        });
    });
});
