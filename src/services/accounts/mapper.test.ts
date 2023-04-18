import { ObjectId } from 'mongodb';

import { Account } from '../../database/models/Account';
import { AccountType } from '../../utils/enums/accounts';
import { mapAccount, mapAccounts } from './mapper';

describe('Services/Accounts', () => {
    describe('Mapper', () => {
        it('should perform the mapping of an array of accounts', () => {
            const input: Array<Account> = [
                {
                    _id: new ObjectId('643f0e26ada4dc370289f80d'),
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('643f0e3d7ac4100aa91b6edf'),
                        name: 'User 1',
                        email: 'teste1@example.com',
                    },
                },
                {
                    _id: new ObjectId('643f0e33e76b9ca702931035'),
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    user: {
                        _id: new ObjectId('643f0e3d7ac4100aa91b6edf'),
                        name: 'User 1',
                        email: 'teste1@example.com',
                    },
                },
            ];

            const mappedAccount = mapAccounts(input);

            expect(mappedAccount).toStrictEqual([
                {
                    id: new ObjectId('643f0e26ada4dc370289f80d'),
                    name: 'Teste 1',
                    type: AccountType.CHECKING_ACCOUNT,
                    isMain: true,
                    userId: new ObjectId('643f0e3d7ac4100aa91b6edf'),
                },
                {
                    id: new ObjectId('643f0e33e76b9ca702931035'),
                    name: 'Teste 2',
                    type: AccountType.INVESTMENT,
                    isMain: true,
                    userId: new ObjectId('643f0e3d7ac4100aa91b6edf'),
                },
            ]);
        });
        it('should perform the mapping of an Account object', () => {
            const input: Account = {
                _id: new ObjectId('643f0e619a1b201232211c73'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: { _id: new ObjectId('643f0e3d7ac4100aa91b6edf'), name: 'User 1', email: 'teste1@example.com' },
            };

            const mappedAccount = mapAccount(input);

            expect(mappedAccount).toStrictEqual({
                id: new ObjectId('643f0e619a1b201232211c73'),
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: new ObjectId('643f0e3d7ac4100aa91b6edf'),
            });
        });
    });
});
