import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB newly connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // Don't kill the Vercel process on error, just log it. Serverless will retry.
  }
};

export default connectDB;