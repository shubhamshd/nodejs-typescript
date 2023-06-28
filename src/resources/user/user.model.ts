import { Schema, model } from "mongoose";
import User from "@resources/user/user.interface";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);


export default model<User>('User', userSchema);