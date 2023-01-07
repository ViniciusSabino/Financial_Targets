import { model, ObjectId, Schema } from 'mongoose';

import { Months } from '../../utils/enums/date';
import { Account } from './Account';

export interface Balance {
    _id: ObjectId;
    account: Account;
    month: Months;
    year: number;
    value: number;
}

const BalanceSchema = new Schema<Balance>(
    {
        account: { type: Schema.Types.ObjectId, ref: 'Account', index: true, required: true },
        month: { type: String, required: true },
        year: { type: Number, required: true },
        value: { type: Number, required: true },
    },
    {
        versionKey: false,
    }
);

const BalanceModel = model<Balance>('Balance', BalanceSchema);

export default BalanceModel;
