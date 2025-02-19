import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET(req) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  if (!slug) {
    return new Response("Invalid slug", { status: 400 });
  }
  const decodedSlug = decodeURIComponent(slug.trim());
  try {
    await connectDB();

    if (!User) {
      throw new Error("User is not registered");
    }
    if (!Category) {
      throw new Error("Category is not defined");
    }
    const post = await Post.findOne({ slug: decodedSlug })
      .populate("category", "title")
      .populate("user", "name image");
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
