import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
}

const UserSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

const UserModel = model<User>('User', UserSchema);

export default UserModel;
