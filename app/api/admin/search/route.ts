import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function validateSession() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, results: [] });
    }

    const regex = new RegExp(query, "i");

    const [categories, subCategories, products] = await Promise.all([
      Category.find({ name: regex }).limit(5).select("name slug"),
      SubCategory.find({ name: regex }).limit(5).select("name slug"),
      Product.find({ name: regex }).limit(5).select("name slug"),
    ]);

    const results = [
      ...categories.map(c => ({ id: c._id, name: c.name, type: "Category", link: `/admin/categories?search=${c.name}` })),
      ...subCategories.map(sc => ({ id: sc._id, name: sc.name, type: "Sub Category", link: `/admin/sub-categories?search=${sc.name}` })),
      ...products.map(p => ({ id: p._id, name: p.name, type: "Product", link: `/admin/products?search=${p.name}` })),
    ];

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Global search error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
