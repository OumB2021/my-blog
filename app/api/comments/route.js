import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("postSlug");
  if (!slug) {
    return new Response("Invalid slug", { status: 400 });
  }
  const decodedSlug = decodeURIComponent(slug.trim());
  try {
    await connectDB();

    const post = await Post.findOne({ slug: decodedSlug });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Fetch comments of post
    const comments = await Comment.find({ postId: post._id }).populate(
      "userId",
      "name image"
    );

    console.log(comments);

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
}
