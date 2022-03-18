import { Document, model, Schema } from 'mongoose';

import { AccountType } from '../../utils/enums/accounts';

export interface Account extends Document {
    name: string;
    type: AccountType;
    isMain: boolean;
    user: Schema.Types.ObjectId;
}

const AccountSchema = new Schema<Account>(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        isMain: { type: Boolean, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    },
    {
        versionKey: false,
    }
);

const AccountModel = model<Account>('Account', AccountSchema);

export default AccountModel;
