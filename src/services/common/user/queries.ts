import UserModel, { User } from '../../../database/models/User';

const findUserById = async (id: string): Promise<User> => {
    const user = await UserModel.findById(id).lean();

    return user as User;
};

export { findUserById };
