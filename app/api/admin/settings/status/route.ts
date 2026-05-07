import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Get database stats
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }
    const stats = await mongoose.connection.db.stats();
    
    // Convert bytes to readable format
    const storageSizeKB = (stats.storageSize / 1024).toFixed(1);
    
    return NextResponse.json({
      success: true,
      status: "Online",
      connection: "Connected",
      storageSize: `${storageSizeKB} KB`,
      rawStats: stats
    });
  } catch (error) {
    console.error("Settings status error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
