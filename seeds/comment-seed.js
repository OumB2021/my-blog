import Comment from "../models/Comment.js";
import { commentData } from "../constants/comment.js";
import connectDB from "../lib/mongodb.js";

export async function seedComments() {
  try {
    await connectDB();
    await Comment.insertMany(commentData);
    console.log("✅ Comments seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding comments:", error);
  }
}

seedComments();
