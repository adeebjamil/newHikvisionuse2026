import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";


async function validateSession() {
  try {
    const session = await getServerSession(authOptions);
    return !!session;
  } catch (error) {
    console.error("Session validation error:", error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const products = await Product.find({}).populate("category", "name").populate("subCategory", "name").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const subTitle = formData.get("subTitle") as string;
    const featuresStr = formData.get("features") as string;
    const features = featuresStr ? featuresStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const keyFeaturesStr = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const isFeatured = formData.get("isFeatured") === "true";
    const imageFiles = formData.getAll("images");

    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadBufferToCloudinary(buffer, "products");
        if (url) imageUrls.push(url as string);
      }
    }


    const product = await Product.create({ 
      name, 
      slug, 
      subTitle, 
      description, 
      features, 
      keyFeatures, 
      category: category || undefined, 
      subCategory: subCategory || undefined, 
      isFeatured, 
      images: imageUrls 
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
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
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const subTitle = formData.get("subTitle") as string;
    const featuresStr = formData.get("features") as string;
    const features = featuresStr ? featuresStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const keyFeaturesStr = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const isFeatured = formData.get("isFeatured") === "true";
    const imageFiles = formData.getAll("images");

    if (!id) return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });

    const updateData: any = { 
      name, 
      slug, 
      subTitle, 
      description, 
      features, 
      keyFeatures, 
      isFeatured 
    };

    if (category) updateData.category = category;
    if (subCategory) updateData.subCategory = subCategory;

    // Only update images if new ones are provided
    const newImageUrls: string[] = [];
    let hasNewImages = false;

    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        hasNewImages = true;
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadBufferToCloudinary(buffer, "products");
        if (url) newImageUrls.push(url as string);
      }
    }

    if (hasNewImages) {
      updateData.images = newImageUrls;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("PUT Product Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
