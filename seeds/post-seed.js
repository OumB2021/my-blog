import { Post } from "@/models/Post";
import { User } from "@/models/User";
import Category from "@/models/Category";
import { connectDB } from "@/lib/mongodb";
import { postData } from "@/constants/posts";

const seedPosts = async () => {
  try {
    await connectDB();

    const users = await User.find();
    if (users.length === 0) {
      console.log(
        "❌ No users found. Please run 'npx tsx seed-users.ts' first."
      );
      process.exit(1);
    }

    await Post.deleteMany({});
    for (const post of postData) {
      const category = await Category.findOne({ slug: post.categorySlug });
      if (!category) {
        console.log(`❌ Category not found: ${post.categorySlug}`);
        continue;
      }

      const randomUser = users[Math.floor(Math.random() * users.length)];

      const newPost = new Post({
        slug: post.slug,
        title: post.title,
        description: post.description,
        image: post.image,
        views: post.views,
        category: category._id,
        user: randomUser._id,
      });

      await newPost.save();
      console.log(`✅ Created post: ${post.title}`);
    }

    console.log("🚀 All 20 posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding posts:", error);
    process.exit(1);
  }
};

seedPosts();
