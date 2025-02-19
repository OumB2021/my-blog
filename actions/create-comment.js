"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export const createComment = async (formData) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  // gather important data
  const comment = formData.get("comment");
  const slug = formData.get("slug");
  const userEmail = session.user?.email;

  if (!comment || !slug) {
    throw new Error("Invalid request");
  }

  await connectDB();

  // find the post
  const foundPost = await Post.findOne({ slug: slug });
  if (!foundPost) {
    throw new Error("Post not found");
  }

  // find appropriate user
  const foundUser = await User.findOne({ email: userEmail });
  if (!foundUser) {
    throw new Error("User not found");
  }

  // create a new comment
  const newComment = await Comment.create({
    content: comment,
    user: foundUser._id,
    post: foundPost._id,
  });

  if (newComment) {
    console.log("Comment created successfully");
    revalidatePath(`/post/${slug}`);
  } else {
    throw new Error("Failed to create comment");
  }
};
