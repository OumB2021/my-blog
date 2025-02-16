import { User } from "@/models/User";
import { connectDB } from "@/lib/mongodb";

// Random user data
const userData = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    image: "/users/User1.jpg",
  },
  {
    name: "Wout Van Aert",
    email: "bob@example.com",
    image: "/users/User9.jpg",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    image: "/users/User2.jpg",
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    image: "/users/User3.jpg",
  },
  {
    name: "Ethan Williams",
    email: "ethan@example.com",
    image: "/users/User4.jpg",
  },
  {
    name: "Fiona Green",
    email: "fiona@example.com",
    image: "/users/User5.jpg",
  },
  {
    name: "George Harrison",
    email: "george@example.com",
    image: "/users/User6.jpg",
  },
  {
    name: "Hannah Lee",
    email: "hannah@example.com",
    image: "/users/User7.jpg",
  },
  {
    name: "Ian John Roberts",
    email: "ian@example.com",
    image: "/users/User10.jpg",
  },
  {
    name: "Jessica Miller",
    email: "jessica@example.com",
    image: "/users/User8.jpg",
  },
];

const seedUsers = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    await User.insertMany(userData);
    console.log("🚀 Successfully added 10 users!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

// Run the script
seedUsers();
