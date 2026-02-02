import mongoose from 'mongoose';
import { RegisterData } from './types/users';

const schema = new mongoose.Schema<RegisterData>(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { __v, _id, ...rest } = ret;
        return rest;
      },
    },
  }
);

export default mongoose.model<RegisterData>('User', schema);
