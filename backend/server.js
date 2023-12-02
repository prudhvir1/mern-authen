//  Required Packages
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRouter from "../backend/routes/userRoutes.js";
import {
  notFound,
  errorHandler,
} from "../backend/middleware/errorMiddleware.js";

//  Connecting Database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//  Test API
app.get("/", (req, res) => res.send(`Server is running!!!`));

//  API Routes
app.use("/api/user", userRouter);

//  Error Handlers
app.use(notFound);
app.use(errorHandler);

//  Server Listening
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
