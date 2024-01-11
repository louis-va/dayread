import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';
import { IPost } from './post.model';

interface ILike extends Document {
  post: Types.ObjectId | IPost;
  liked_by: Types.ObjectId | IUser;
  date: Date;
}

const LikeSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date
});

const Like: Model<ILike> = mongoose.model<ILike>('Like', LikeSchema);

export { ILike, Like }