import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";

import { Product } from "@/models/Product";

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

    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
    
    // Fetch item counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat: any) => {
        const catId = cat._id.toString();
        const count = await Product.countDocuments({ 
          $or: [
            { category: cat._id },
            { category: catId }
          ]
        });
        console.log(`API Category: ${cat.name} ID: ${catId} -> Count: ${count}`);
        return {
          ...cat,
          count: count
        };
      })
    );

    return NextResponse.json({ success: true, data: categoriesWithCounts });
  } catch (error) {
    console.error("GET Categories Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: "Name and slug are required" }, { status: 400 });
    }

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newCategory = await Category.create({ name, slug, image: imageUrl });
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !slug) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const updateData: any = { name, slug };

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filepath, buffer);
      updateData.image = `/uploads/${filename}`;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
