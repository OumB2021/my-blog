import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { auth } from "@/auth";

export async function GET() {
  await connectDB();

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { user } = session;

  // Check if user exists in MongoDB
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists" });
  }

  // Create a new user if not found
  const newUser = await User.create({
    name: user.name,
    email: user.email,
    image: user.image,
  });

  if (newUser) {
    console.log("✅ New user created:", newUser.email);
    return NextResponse.json({ message: "User created", user: newUser });
  }

  return NextResponse.json({ message: "Error creating user" }, { status: 500 });
}
