import { Account } from '../../database/models/Account';
import { AccountType } from '../../utils/enums/accounts';
import { mapperAccounts } from './mapper';

describe('Services/Accounts', () => {
    describe('Mapper', () => {
        it('should perform the mapping of an array of accounts', () => {
            const input: Array<Account> = [
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

            const mappedAccount = mapperAccounts(input);

            expect(mappedAccount).toStrictEqual([
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
            ]);
        });
        it('should perform the mapping of an Account object', () => {
            const input: Account = {
                _id: '123',
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                user: { _id: '12', name: 'User 1', email: 'teste1@example.com' },
            };

            const mappedAccount = mapperAccounts(input);

            expect(mappedAccount).toStrictEqual({
                id: '123',
                name: 'Teste 1',
                type: AccountType.CHECKING_ACCOUNT,
                isMain: true,
                userId: '12',
            });
        });
    });
});
