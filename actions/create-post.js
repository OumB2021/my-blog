"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";

export const createPost = async (formData) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title");
  const category = formData.get("category");
  const fileUrl = formData.get("fileurl");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await connectDB();

  const foundCategory = await Category.findOne({ slug: category });
  if (!foundCategory) {
    throw new Error("Invalid category");
  }

  const foundUser = await User.findOne({ email: session.user.email });
  if (!foundUser) {
    throw new Error("User not found");
  }

  const newPost = await Post.create({
    slug: title.toLowerCase().replace(/ /g, "-"),
    title,
    description: content,
    image: fileUrl,
    views: 0,
    category: foundCategory._id,
    user: foundUser._id,
  });

  console.log("✅ Post created:", newPost.title);

  revalidatePath("/");
};
