import mongoose, { Schema, Document } from "mongoose";

const PostSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    views: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);

export default Post;
