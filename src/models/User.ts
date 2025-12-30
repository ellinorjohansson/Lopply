import mongoose, { Schema, Model } from 'mongoose';

export interface IUsers {
    _id?: string;
    email: string;
    password: string;
    admin: boolean;
}

const UserSchema = new Schema<IUsers>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false,
        }

    }
);

const User: Model<IUsers> = mongoose.models.User || mongoose.model<IUsers>('User', UserSchema);

export default User;
