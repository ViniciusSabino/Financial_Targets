import { Schema } from 'mongoose';

import { AccountType } from '../../utils/enums/accounts';
import UserSchema, { User } from './User';

export interface Account {
    id: string;
    name: string;
    type: AccountType;
    isMain: boolean;
    user: User;
}

const AccountSchema = new Schema<Account>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    isMain: { type: Boolean, required: true },
    user: { type: UserSchema, required: true },
});

export default AccountSchema;
