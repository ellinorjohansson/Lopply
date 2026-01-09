import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { userId, admin } = await request.json();

    if (!userId || typeof admin !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { admin },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
