import UserModel, { User } from '../../../database/models/User';

const findUserById = async (id: string): Promise<User> => {
    const user: User = await UserModel.findById(id).lean();

    return user;
};

export { findUserById };
