import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import RequestType from "../middleware/authMiddleware";
import { Response } from "express";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Register user
// @route /api/users/
// @access public
export const registerUser = expressAsyncHandler(
  async (req: RequestType, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc Login user
// @route /api/users/login
// @access public
export const loginUser = expressAsyncHandler(
  async (req: RequestType, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }
);

// @desc Get user information
// @route /api/users/me
// @access private
export const getUser = expressAsyncHandler(
  async (req: RequestType, res: Response) => {
    res.status(200).json(req.user);
  }
);
