import { connectDB } from "./lib/mongodb";
import { User } from "./models/User";

async function testMongoDB() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connection successful!");

    // Create a test user
    const testUser = await User.create({
      name: "Test User",
      email: "teswfefwe@examplew.com",
      image: "https://example.com/test-image.jpg",
    });

    console.log("✅ Test user created:", testUser);

    // Fetch the test user from the database
    const fetchedUser = await User.findOne({ email: "testuser@example.com" });
    console.log("🔍 Retrieved user from MongoDB:", fetchedUser);

    process.exit(0); // Exit process on success
  } catch (error) {
    console.error("❌ MongoDB test failed:", error);
    process.exit(1); // Exit process on failure
  }
}

// Run the test
testMongoDB();
