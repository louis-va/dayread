import mongoose, { ConnectOptions } from "mongoose";
import env from '../../env.config'
import database from '../../src/models';

const connect = async () => {
  await database.mongoose
    .connect(env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export default { connect, close, clear };