import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

// Ensure the model is registered only once
const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
