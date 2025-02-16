import mongoose, { Schema, Document } from "mongoose";

// ✅ Ensure Mongoose is connected before defining the model
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

// ✅ Use a global variable to prevent model redefinition
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
