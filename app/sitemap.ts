import { MetadataRoute } from "next";
import mongoose from "mongoose";

const SITE_URL = "https://hikvisionuae.ae";
const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/technologies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/solutions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Technology pages
    { url: `${SITE_URL}/technologies/tandemvu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/technologies/acusense`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/technologies/darkfighter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/technologies/colorvu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Solution pages
    { url: `${SITE_URL}/solutions/manufacturing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/retail`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/healthcare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/education`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/government`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/residential`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/logistics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/solutions/hospitality`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    await connectDB();
    const db = mongoose.connection.db!;

    // Fetch all categories
    const categories = await db.collection("categories").find({}, { projection: { slug: 1, updatedAt: 1 } }).toArray();
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${SITE_URL}/products/${cat.slug}`,
      lastModified: cat.updatedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    // Fetch all subcategories with their parent category slugs
    const subcategories = await db.collection("subcategories")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "parentCategory",
          },
        },
        { $unwind: "$parentCategory" },
        { $project: { slug: 1, "parentCategory.slug": 1, updatedAt: 1 } },
      ])
      .toArray();

    const subCategoryPages: MetadataRoute.Sitemap = subcategories.map((sub) => ({
      url: `${SITE_URL}/products/${sub.parentCategory.slug}/${sub.slug}`,
      lastModified: sub.updatedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Fetch all products with category + subcategory slugs
    const products = await db.collection("products")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "cat",
          },
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "_id",
            as: "sub",
          },
        },
        { $unwind: "$cat" },
        { $unwind: "$sub" },
        { $project: { slug: 1, "cat.slug": 1, "sub.slug": 1, updatedAt: 1 } },
      ])
      .toArray();

    const productPages: MetadataRoute.Sitemap = products.map((prod) => ({
      url: `${SITE_URL}/products/${prod.cat.slug}/${prod.sub.slug}/${prod.slug}`,
      lastModified: prod.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

    return [...staticPages, ...categoryPages, ...subCategoryPages, ...productPages];
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return staticPages;
  }
}
