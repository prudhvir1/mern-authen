import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB Connected - ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error - ${error.message}`);
  }
};
