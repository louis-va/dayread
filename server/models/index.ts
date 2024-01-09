import mongoose, { Mongoose, Model } from 'mongoose';

import { IUser, User } from "./user.model";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: Mongoose;
    user: Model<IUser>;
}

const database: Database = {
    mongoose: mongoose,
    user: User
};

export default database;
