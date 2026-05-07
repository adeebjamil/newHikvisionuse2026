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

async function seedSubCategories() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    // Retrieve the parent categories to get their ObjectIds
    const cameraCategory = await Category.findOne({ slug: "cctv-camera" });
    const accessoriesCategory = await Category.findOne({ slug: "cctv-accessories" });

    if (!cameraCategory || !accessoriesCategory) {
        console.error("❌ Could not find the parent categories. Please make sure they are seeded first.");
        return;
    }

    const subCategoriesToSeed = [
      { name: "Network Camera", slug: "network-camera", category: cameraCategory._id },
      { name: "PTZ Camera", slug: "ptz-camera", category: cameraCategory._id },
      { name: "Explosion Proof", slug: "explosion-proof", category: cameraCategory._id },
      { name: "TurboHD", slug: "turbohd", category: cameraCategory._id },
      
      { name: "Network Video Recorder", slug: "network-video-recorder", category: accessoriesCategory._id },
      { name: "DVR", slug: "dvr", category: accessoriesCategory._id },
      { name: "Access Control", slug: "access-control", category: accessoriesCategory._id },
      { name: "Video Intercom", slug: "video-intercom", category: accessoriesCategory._id }
    ];

    for (const subCat of subCategoriesToSeed) {
      const updated = await SubCategory.findOneAndUpdate(
        { slug: subCat.slug },
        { 
          $set: { 
            name: subCat.name,
            category: subCat.category 
          } 
        }, 
        { upsert: true, new: true }
      );
      console.log(`✅ Upserted SubCategory: ${updated.name} (${updated.slug})`);
    }

    console.log("🎉 All SubCategories seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding subcategories:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedSubCategories();
