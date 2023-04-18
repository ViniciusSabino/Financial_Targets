import { ObjectId } from 'mongodb';
import { model, Schema, Model } from 'mongoose';

export interface User {
    _id: ObjectId;
    name: string;
    email: string;
}

const UserSchema: Schema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

const UserModel: Model<User> = model<User>('User', UserSchema);

export default UserModel;
