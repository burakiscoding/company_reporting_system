import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  _id: String;
  username: String;
  password: String;
  displayName: String;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
