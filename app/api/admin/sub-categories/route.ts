import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SubCategory } from "@/models/SubCategory";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";


import { Product } from "@/models/Product";

async function validateSession() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    
    const subCategories = await SubCategory.find({}).populate("category", "name").sort({ createdAt: -1 }).lean();
    
    const subCategoriesWithCounts = await Promise.all(
      subCategories.map(async (sub: any) => {
        const subId = sub._id.toString();
        const count = await Product.countDocuments({ 
          $or: [
            { subCategory: sub._id },
            { subCategory: subId }
          ]
        });
        return {
          ...sub,
          count: count
        };
      })
    );

    return NextResponse.json({ success: true, data: subCategoriesWithCounts });
  } catch (error) {
    console.error("GET SubCategories Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug || !category) return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const url = await uploadBufferToCloudinary(buffer, "subcategories");
      imageUrl = url as string;
    }


    const newSubCategory = await SubCategory.create({ name, slug, category, image: imageUrl });
    return NextResponse.json({ success: true, data: newSubCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await SubCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !slug || !category) return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    const updateData: any = { name, slug, category };

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const url = await uploadBufferToCloudinary(buffer, "subcategories");
      updateData.image = url as string;
    }


    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedSubCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
