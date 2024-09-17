import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

// index to enforce uniqueness based on user's email and to optimize queries
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', UserSchema);
