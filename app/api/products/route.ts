import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { SubCategory } from '@/models/SubCategory';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subCategorySlug = searchParams.get('subcategory');

  try {
    await dbConnect();

    let query: any = {};

    if (subCategorySlug) {
      const subCat = await SubCategory.findOne({ slug: subCategorySlug });
      if (subCat) {
        query.subCategory = subCat._id;
      } else {
        return NextResponse.json({ products: [] });
      }
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .populate('category')
      .populate('subCategory');

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
