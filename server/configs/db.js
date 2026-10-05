import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connected successfully")
    );

    // FIX 🔥 (Do NOT append /ZUNO)
    await mongoose.connect(process.env.mongoDB_URI);

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
