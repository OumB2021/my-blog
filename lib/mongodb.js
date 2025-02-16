import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://baarryoumar:jkjkjk94@cluster0.ztty5.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
