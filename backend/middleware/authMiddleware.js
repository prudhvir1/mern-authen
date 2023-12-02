import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      // res.send("Valid User");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("No Token");
    }
  } else {
    res.status(401);
    throw new Error("No Token");
  }
});

export { protect };
