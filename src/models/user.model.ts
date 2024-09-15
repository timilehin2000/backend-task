import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
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

// index to enforce uniqueness based on user's email
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt();

    const hash = bcrypt.hashSync(user.password, salt);

    this.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', UserSchema);
