import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  bio: string
}

const UserSchema = new Schema({
  email: String,
  password: String,
  username: String,
  firstname: String,
  lastname: String,
  bio: String
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { IUser, User }