import { Document, Model, Types } from "mongoose";

export interface INote {
  user: Types.ObjectId;
  video_id: string;
  notes: string;
  video_title: string;
}

export interface INoteDocument extends INote, Document {}

export interface INoteModel extends Model<INoteDocument> {
  buildNote(args: INote): INoteDocument;
}

// https://javascript.plainenglish.io/improving-mongoose-model-with-typescript-9a349f41c71
