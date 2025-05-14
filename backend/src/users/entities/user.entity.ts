import { Document } from 'mongoose';

export type UserDocument = Document & {
  email: string;
  name: string;
  password: string;
};