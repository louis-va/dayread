import mongoose, { Mongoose, Model } from 'mongoose';

import { IUser, User } from "./user.model";
import { IPost, Post } from './post.model';
import { IFollow, Follow } from './follow.model';
import { ILike, Like } from './like.model';

mongoose.Promise = global.Promise;

interface Database {
    mongoose: Mongoose;
    user: Model<IUser>;
    post: Model<IPost>;
    follow: Model<IFollow>;
    like: Model<ILike>;
}

const database: Database = {
    mongoose: mongoose,
    user: User,
    post: Post,
    follow: Follow,
    like: Like
};

export default database;
