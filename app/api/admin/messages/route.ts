import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id, isRead, isResolved } = await req.json();
    const message = await Contact.findByIdAndUpdate(id, { isRead, isResolved }, { new: true });
    return NextResponse.json(message);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update message" }, { status: 500 });
  }
}
