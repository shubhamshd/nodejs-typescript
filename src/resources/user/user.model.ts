import { Schema, model } from 'mongoose';
import User from '@resources/user/user.interface';
import bcrypt from 'bcrypt';
import { string } from 'joi';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: String,
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

const UserModel = model<User>('User', UserSchema, 'users');
export default UserModel;
