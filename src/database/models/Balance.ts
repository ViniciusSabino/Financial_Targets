import { Document, model, Schema } from 'mongoose';
import { Account } from './Account';

export interface Balance extends Document {
    account: Account;
    month: string;
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
