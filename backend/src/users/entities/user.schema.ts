import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);