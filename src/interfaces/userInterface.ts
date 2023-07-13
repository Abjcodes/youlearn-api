import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  buildNote(args: IUser): IUserDocument;
}

// https://javascript.plainenglish.io/improving-mongoose-model-with-typescript-9a349f41c71
