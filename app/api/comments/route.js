import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { Post } from "@/models/Post";
import { User } from "@/models/User";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("postSlug");
  if (!slug) {
    return new Response("Invalid slug", { status: 400 });
  }
  const decodedSlug = decodeURIComponent(slug.trim());
  try {
    await connectDB();

    if (!User) {
      throw new Error("User is not registered");
    }

    const post = await Post.findOne({ slug: decodedSlug });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // fetch comments of post
    const comments = await Comment.find({ post: post._id }).populate(
      "user",
      "name image"
    );

    if (!comments) {
      return new Response("No comments found", { status: 404 });
    }

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 400 })
    );
  }
}
