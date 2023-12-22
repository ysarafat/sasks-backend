import { Schema, model } from 'mongoose';
import { TUser, TUserName } from './user.interface';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});
const userSchema = new Schema<TUser>(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: userNameSchema,
      required: true,
      _id: false,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user',
    },

    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordUpdateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<TUser>('User', userSchema);
