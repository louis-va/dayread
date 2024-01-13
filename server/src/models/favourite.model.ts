import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';
import { IPost } from './post.model';

interface IFavourite extends Document {
  post: Types.ObjectId | IPost;
  liked_by: Types.ObjectId | IUser;
  date: Date;
}

const FavouriteSchema = new Schema({
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

const Favourite: Model<IFavourite> = mongoose.model<IFavourite>('Favourite', FavouriteSchema);

export { IFavourite, Favourite }