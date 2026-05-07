const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Read MONGODB_URI directly from .env file
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const uriMatch = envContent.match(/MONGODB_URI="([^"]+)"/);
if (!uriMatch) {
  console.error("Could not find MONGODB_URI in .env");
  process.exit(1);
}
const MONGODB_URI = uriMatch[1];

// Helper to generate slug
const slugify = (text) => text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

// SubCategory Schema
const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
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
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

async function seedProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    const seedFilePath = path.join(__dirname, "products-seed.json");
    if (!fs.existsSync(seedFilePath)) {
      console.error("❌ products-seed.json not found!");
      return;
    }

    const fileContent = fs.readFileSync(seedFilePath, "utf8");
    if (!fileContent.trim()) {
      console.error("❌ products-seed.json is empty!");
      return;
    }

    const productsData = JSON.parse(fileContent);
    console.log(`Found ${productsData.length} products to process.`);

    for (const prod of productsData) {
      // 1. Ensure Category exists
      let category = await Category.findOne({ 
        $or: [
          { name: new RegExp(`^${prod.category}$`, 'i') },
          { slug: slugify(prod.category) }
        ]
      });

      if (!category) {
        console.log(`Creating missing Category: "${prod.category}"`);
        category = await Category.create({
          name: prod.category,
          slug: slugify(prod.category)
        });
      }

      // 2. Ensure SubCategory exists
      let subCategory = await SubCategory.findOne({ 
        $or: [
          { name: new RegExp(`^${prod.subCategory}$`, 'i') },
          { slug: slugify(prod.subCategory) }
        ],
        category: category._id
      });

      if (!subCategory) {
        console.log(`Creating missing SubCategory: "${prod.subCategory}" under "${category.name}"`);
        subCategory = await SubCategory.create({
          name: prod.subCategory,
          slug: slugify(prod.subCategory),
          category: category._id
        });
      }

      // 3. Upsert Product
      const productSlug = prod.slug || slugify(prod.name);
      const productToUpsert = {
        name: prod.name,
        slug: productSlug,
        subTitle: prod.subTitle || "",
        category: category._id,
        subCategory: subCategory._id,
        description: prod.description || "",
        features: prod.features || [],
        keyFeatures: prod.keyFeatures || [],
        images: prod.images || [],
        isFeatured: prod.isFeatured || false,
        updatedAt: new Date()
      };

      const updated = await Product.findOneAndUpdate(
        { slug: productSlug },
        { $set: productToUpsert },
        { upsert: true, new: true }
      );

      console.log(`✅ Upserted Product: ${updated.name}`);
    }

    console.log("\n🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedProducts();
