import { IUser } from '../models/user.model';

declare global {
    export namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
