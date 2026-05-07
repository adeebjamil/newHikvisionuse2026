const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Read MONGODB_URI directly from .env file
const envPath = path.join(__dirname, "..", ".env");
if (!fs.existsSync(envPath)) {
  console.error(".env file not found at", envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const uriMatch = envContent.match(/MONGODB_URI="?([^"\n\s]+)"?/);
if (!uriMatch) {
  console.error("Could not find MONGODB_URI in .env");
  process.exit(1);
}
const MONGODB_URI = uriMatch[1];

// ⬇️ SMART MAPPING CONFIGURATION ⬇️
const ID_MAPPING = {
  // Categories
  "69eb0f27fb11a78a0e2f175a": { name: "Network Cameras", slug: "network-cameras" },
  
  // SubCategories
  "69eb0f27fb11a78a0e2f175e": { name: "Fixed Bullet Cameras", slug: "fixed-bullet-cameras" },
};

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
});
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

// SubCategory Schema
const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
});
const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subTitle: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  features: [{ type: String }],
  keyFeatures: [{ type: String }],
  specifications: { type: mongoose.Schema.Types.Mixed },
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

async function importProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    const uploadsDir = path.join(__dirname, "..", "public", "uploads");
    const uploadFiles = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];

    const importFilePath = path.join(__dirname, "provided-products.json");
    const productsData = JSON.parse(fs.readFileSync(importFilePath, "utf8"));
    console.log(`Processing ${productsData.length} products...`);

    for (const prod of productsData) {
      // 🧼 Clean Name (Remove "Hikvision " prefix)
      const cleanName = prod.name.replace(/^Hikvision\s+/i, "");
      // 🧼 Clean Slug (Generate from clean name)
      const cleanSlug = cleanName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      console.log(`\n📦 Product: ${cleanName}`);

      // 1. Resolve Category
      let catName = ID_MAPPING[prod.category]?.name || "Imported Category";
      let catSlug = ID_MAPPING[prod.category]?.slug || `imported-${prod.category}`;

      let category = await Category.findOne({ slug: catSlug });
      if (!category) category = await Category.findById(prod.category);
      if (!category) {
        category = await Category.create({ _id: prod.category, name: catName, slug: catSlug });
      }

      // 2. Resolve SubCategory
      let subName = ID_MAPPING[prod.subCategory]?.name || "Imported SubCategory";
      let subSlug = ID_MAPPING[prod.subCategory]?.slug || `imported-${prod.subCategory}`;

      let subCategory = await SubCategory.findOne({ slug: subSlug });
      if (!subCategory) subCategory = await SubCategory.findById(prod.subCategory);
      if (!subCategory) {
        subCategory = await SubCategory.create({ _id: prod.subCategory, name: subName, slug: subSlug, category: category._id });
      }

      // 3. Fuzzy Image Matching
      const resolvedImages = [];
      if (prod.images && prod.images.length > 0) {
        for (const imgPath of prod.images) {
          const originalFilename = imgPath.split('/').pop();
          const cleanFilename = originalFilename.replace(/^\d+-/, "");
          const match = uploadFiles.find(f => f.includes(cleanFilename) || cleanFilename.includes(f.split('-').pop()));
          if (match) {
            resolvedImages.push(`/uploads/${match}`);
          } else {
            resolvedImages.push(imgPath);
          }
        }
      }

      const productToUpsert = {
        name: cleanName,
        slug: cleanSlug,
        subTitle: prod.subTitle || "",
        category: category._id,
        subCategory: subCategory._id,
        description: prod.description || "",
        features: prod.features || [],
        keyFeatures: prod.keyFeatures || [],
        specifications: prod.specifications || {},
        images: resolvedImages,
        rating: prod.rating || 5,
        reviewCount: prod.reviewCount || 0,
        isFeatured: prod.isFeatured || false,
        updatedAt: new Date()
      };

      // 🛑 MERGE LOGIC: Remove existing product with same name/slug to prevent duplicates
      // We look for anything that starts with Hikvision + cleanName or is exactly cleanName
      const duplicatePattern = new RegExp(`^(Hikvision\\s+)?${cleanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
      await Product.deleteMany({ name: duplicatePattern, slug: { $ne: cleanSlug } });

      await Product.findOneAndUpdate({ slug: cleanSlug }, { $set: productToUpsert }, { upsert: true });
      console.log(`   ✅ Synced as: ${cleanSlug}`);
    }

    console.log("\n🎉 ALL DONE!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

importProducts();
