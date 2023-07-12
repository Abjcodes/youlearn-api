import mongoose, { Schema } from "mongoose";
import { INote, INoteDocument, INoteModel } from "../interfaces/noteInterface";

const NoteSchema: Schema<INoteDocument> = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    video_id: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    video_title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.statics.buildNote = (args: INote) => {
  return new Note(args);
};

const Note = mongoose.model<INoteDocument, INoteModel>("Note", NoteSchema);

export default Note;
