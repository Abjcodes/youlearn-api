import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";

export default interface RequestType extends Request {
  //Fix this
  user?: any;
}

export const protect = expressAsyncHandler(
  async (req: RequestType, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
          id: string;
        };
        req.user = await User.findById(decodedToken.id).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("No token, not authorized");
    }
  }
);
