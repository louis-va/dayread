import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';

interface IFollow extends Document {
  follower: Types.ObjectId | IUser;
  following: Types.ObjectId | IUser;
  date: Date;
}

const FollowSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date
});

const Follow: Model<IFollow> = mongoose.model<IFollow>('Follow', FollowSchema);

export { IFollow, Follow }