import mongoose from 'mongoose';
import config from '../config';
const { host, port, name } = config.db;
const DB_URL = `mongodb://${host}:${port}/${name}`;

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB connected successfully !');
  } catch (e) {
    console.log(e);
  }
};
