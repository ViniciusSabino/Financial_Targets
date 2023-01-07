import mongoose from 'mongoose';

import { AccountType } from '../../utils/enums/accounts';
import { Months } from '../../utils/enums/date';
import { CurrentBalancesMapped, mapperCurrentBalances } from './mapper';
import { DateInfo } from '../../utils/helpers/date';
import { Balance } from '../../database/models/Balance';
import { CurrentBalanceTypes } from '../../utils/enums/balances';

describe('Services/Balances', () => {
    describe('Mapper', () => {
        test('mapperCurrentBalances', () => {
            const currentBalances: Array<Balance> = [
                {
                    _id: new mongoose.Schema.Types.ObjectId('63b9c10e0dff9638825ac854'),
                    account: {
                        _id: new mongoose.Schema.Types.ObjectId('63b9bf7450b9746007ff15fe'),
                        name: 'Conta 1',
                        type: AccountType.CHECKING_ACCOUNT,
                        isMain: true,
                        user: {
                            _id: new mongoose.Schema.Types.ObjectId('63b9bd4292786804949462ef'),
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                    },
                    month: Months.JANUARY,
                    year: 2023,
                    value: 230.1,
                },
                {
                    _id: new mongoose.Schema.Types.ObjectId('63b9c118b020ce45f8f1a57b'),
                    account: {
                        _id: new mongoose.Schema.Types.ObjectId('63b9bd4930e79ec7f7eef405'),
                        name: 'Conta 2',
                        type: AccountType.INVESTMENT,
                        isMain: true,
                        user: {
                            _id: new mongoose.Schema.Types.ObjectId('63b9bd520ca87bef46768654'),
                            name: 'User 1',
                            email: 'email@email.com',
                        },
                    },
                    month: Months.JANUARY,
                    year: 2023,
                    value: 707.1,
                },
            ];

            const dateInfo: DateInfo = {
                month: Months.JANUARY,
                year: 2023,
            };

            const currentBalancesMapped: CurrentBalancesMapped = mapperCurrentBalances(currentBalances, dateInfo);

            expect(currentBalancesMapped).toEqual({
                month: Months.JANUARY,
                year: 2023,
                accounts: [
                    {
                        id: new mongoose.Schema.Types.ObjectId('63b9c10e0dff9638825ac854'),
                        accountId: new mongoose.Schema.Types.ObjectId('63b9bf7450b9746007ff15fe'),
                        name: 'Conta 1',
                        type: CurrentBalanceTypes.ACCOUNT,
                        value: 230.1,
                        isMain: true,
                    },
                ],
                investments: [
                    {
                        id: new mongoose.Schema.Types.ObjectId('63b9c118b020ce45f8f1a57b'),
                        accountId: new mongoose.Schema.Types.ObjectId('63b9bd4930e79ec7f7eef405'),
                        name: 'Conta 2',
                        type: CurrentBalanceTypes.INVESTMENT,
                        value: 707.1,
                        isMain: true,
                    },
                ],
            });
        });
    });
});
