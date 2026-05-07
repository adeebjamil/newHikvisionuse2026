import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { SubCategory } from '@/models/SubCategory';
import { Product } from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all categories
    const categories = await Category.find().sort({ name: 1 });

    const catalog = await Promise.all(
      categories.map(async (cat) => {
        // Fetch subcategories for this category
        const subCats = await SubCategory.find({ category: cat._id }).sort({ name: 1 });

        const subCategoriesWithProducts = await Promise.all(
          subCats.map(async (sub) => {
            // Fetch top 3 products for each subcategory to keep the nav response small
            const products = await Product.find({ subCategory: sub._id })
              .select('name slug images')
              .limit(3)
              .sort({ createdAt: -1 });

            return {
              _id: sub._id,
              name: sub.name,
              slug: sub.slug,
              image: sub.image,
              products: products.map(p => ({
                name: p.name,
                slug: p.slug,
                image: p.images?.[0] || null
              }))
            };
          })
        );

        return {
          _id: cat._id,
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          subCategories: subCategoriesWithProducts
        };
      })
    );

    return NextResponse.json(catalog);
  } catch (error) {
    console.error('Failed to fetch nav products:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
