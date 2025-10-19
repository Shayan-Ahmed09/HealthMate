import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB is Connected ✅");
  } catch (error) {
    console.log("Error in connecting MongoDB🚫", error);
  }
};
