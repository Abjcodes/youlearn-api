import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getUser);

export default router;
