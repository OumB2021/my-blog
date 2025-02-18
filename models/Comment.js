import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid redefining it
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
