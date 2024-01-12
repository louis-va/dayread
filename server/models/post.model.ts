import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';

interface IPost extends Document {
  content: string;
  author: Types.ObjectId | IUser;
  commented_on: Types.ObjectId | IPost | null;
  is_comment: boolean;
  created_date: Date;
}

const PostSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commented_on: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  is_comment: Boolean,
  created_date: Date
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);

export { IPost, Post }