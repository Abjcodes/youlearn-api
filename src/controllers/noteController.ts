import expressAsyncHandler from "express-async-handler";
import Note from "../models/noteModel";
import RequestType from "../middleware/authMiddleware";
import { Response } from "express";

const asyncHandler = expressAsyncHandler;

// @desc GET all notes
// @route GET api/notes
// @access Private

export const getNotes = asyncHandler(
  async (req: RequestType, res: Response) => {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  }
);

// @desc Set note
// @route POST api/notes
// @access Private

export const setNotes = asyncHandler(
  async (req: RequestType, res: Response) => {
    if (!req.body.note) {
      res.status(400).json(req.body.note);
      throw new Error("Please add a note");
    }
    const note = await Note.create({
      user: req.user.id,
      video_id: req.body.vId,
      notes: req.body.note,
      video_title: req.body.vT,
    });
    res.status(200).json(note);
  }
);

// @desc Update note
// @route PUT api/notes/:id
// @access Private

export const updateNotes = asyncHandler(
  async (req: RequestType, res: Response) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400);
      throw new Error("Note not found");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (req.user.id !== note.user.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  }
);

// @desc Delete note
// @route DELETE api/notes/:id
// @access Private

export const deleteNotes = asyncHandler(
  async (req: RequestType, res: Response) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400);
      throw new Error("Note not found");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (req.user.id !== note.user.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedNote);
  }
);
