import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';

interface IPost extends Document {
  commented_on: Types.ObjectId | IPost | null;
  posted_by: Types.ObjectId | IUser;
  content: string;
  posted_on: Date;
}

const PostSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  created_dt: Date
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);

export { IPost, Post }