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

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

async function seedCategories() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    const categoriesToSeed = [
      { name: "CCTV CAMERA", slug: "cctv-camera" },
      { name: "CCTV ASSESORIES", slug: "cctv-accessories" }
    ];

    for (const cat of categoriesToSeed) {
      const updated = await Category.findOneAndUpdate(
        { slug: cat.slug },
        { $set: { name: cat.name } }, // Image is intentionally left out to be added later
        { upsert: true, new: true }
      );
      console.log(`✅ Upserted category: ${updated.name} (${updated.slug})`);
    }

    console.log("🎉 All categories seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedCategories();
