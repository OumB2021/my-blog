import { commentData } from "@/constants/comment";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";

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
