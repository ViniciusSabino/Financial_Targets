import { model, Schema } from 'mongoose';

export interface User {
    id: string;
    name: string;
    email: string;
}

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
