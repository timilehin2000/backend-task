import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../../config/env.config';
import { IUser } from '../../models/user.model';

export const generateToken = (user: IUser): string => {
    const token: string = sign({ id: user._id }, jwtSecret, {
        expiresIn: '1d',
    });

    return token;
};

export const verifyToken = (token: string): JwtPayload => {
    const decoded = verify(token, jwtSecret) as JwtPayload;

    return decoded;
};
