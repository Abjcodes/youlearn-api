import express from "express";

import {
  deleteNotes,
  getNotes,
  setNotes,
  updateNotes,
} from "../controllers/noteController";

const router = express.Router();

router.route("/").get(getNotes).post(setNotes);
router.route("/:id").put(updateNotes).delete(deleteNotes);

export default router;
