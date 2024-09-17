import { IUserInput } from '../interfaces/user.interface';
import { IUser, User } from '../models/user.model';

export const createUser = async (userData: IUserInput): Promise<IUser> => {
    const newUser = await new User(userData).save();

    return newUser;
};

export const findAllUsers = async (): Promise<IUser[]> => {
    const users = await User.find({});

    return users;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });

    return user;
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findOne({ _id: id });

    return user;
};
