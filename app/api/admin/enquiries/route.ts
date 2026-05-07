import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductEnquiry } from "@/models/ProductEnquiry";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function validateSession() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const enquiries = await ProductEnquiry.find({})
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("GET Enquiries Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const { id, status } = await req.json();
    
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "Missing id or status" }, { status: 400 });
    }
    
    const enquiry = await ProductEnquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!enquiry) {
      return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error("PATCH Enquiry Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await ProductEnquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
