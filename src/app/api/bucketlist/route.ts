import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Bucketlist from "@/models/Bucketlist";
import Race from "@/models/Race";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const bucketlistItems = await Bucketlist.find({ userId: user._id.toString() });
    const raceIds = bucketlistItems.map((item: { raceId: string }) => item.raceId);

    const races = await Race.find({ _id: { $in: raceIds } });

    return NextResponse.json(
      { success: true, data: races },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bucketlist:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { raceId } = await req.json();

    if (!raceId) {
      return NextResponse.json(
        { success: false, message: "Race ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const race = await Race.findById(raceId);
    if (!race) {
      return NextResponse.json(
        { success: false, message: "Race not found" },
        { status: 404 }
      );
    }

    const existing = await Bucketlist.findOne({
      userId: user._id.toString(),
      raceId,
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Race already in bucketlist" },
        { status: 400 }
      );
    }

    const bucketlistItem = new Bucketlist({
      userId: user._id.toString(),
      raceId,
    });

    await bucketlistItem.save();

    return NextResponse.json(
      { success: true, message: "Added to bucketlist", data: bucketlistItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to bucketlist:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { raceId } = await req.json();

    if (!raceId) {
      return NextResponse.json(
        { success: false, message: "Race ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const result = await Bucketlist.deleteOne({
      userId: user._id.toString(),
      raceId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Race not in bucketlist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Removed from bucketlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from bucketlist:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
