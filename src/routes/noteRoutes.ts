import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  deleteNotes,
  getNotes,
  setNotes,
  updateNotes,
} from "../controllers/noteController";

const router = express.Router();

router.route("/").get(protect, getNotes).post(protect, setNotes);
router.route("/:id").put(protect, updateNotes).delete(protect, deleteNotes);

export default router;
