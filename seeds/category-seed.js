import Category from "@/models/Category";
import { connectDB } from "@/lib/mongodb";
import { categoryData } from "@/constants/category";

// Categories with predefined colors & images

const seedCategories = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    if (!Category) {
      throw new Error("Category model is not registered");
    }

    await Category.deleteMany({});
    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log("⚠️ Categories already exist. Skipping seeding.");
      process.exit(0);
    }

    await Category.insertMany(categoryData);
    console.log("🚀 Successfully added 6 categories!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

// Run the script
seedCategories();
