import mongoose, { Schema } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "../interfaces/userInterface";

const UserSchema: Schema<IUserDocument> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.buildNote = (args: IUser) => {
  return new User(args);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
