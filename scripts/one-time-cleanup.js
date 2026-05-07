const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const uriMatch = envContent.match(/MONGODB_URI="?([^"\n\s]+)"?/);
const MONGODB_URI = uriMatch[1];

async function cleanup() {
  await mongoose.connect(MONGODB_URI);
  const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({ name: String, slug: String }));
  
  const products = await Product.find({});
  console.log(`Checking ${products.length} products...`);

  for (const prod of products) {
    if (prod.name.startsWith("Hikvision ")) {
      const cleanName = prod.name.replace(/^Hikvision\s+/i, "");
      const cleanSlug = cleanName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      
      console.log(`Cleaning: ${prod.name} -> ${cleanName}`);
      
      // Check if another product with the clean slug already exists
      const existing = await Product.findOne({ slug: cleanSlug, _id: { $ne: prod._id } });
      if (existing) {
        console.log(`   Merging duplicate: ${cleanSlug}`);
        await Product.deleteOne({ _id: prod._id });
      } else {
        prod.name = cleanName;
        prod.slug = cleanSlug;
        await prod.save();
      }
    }
  }

  console.log("Cleanup complete!");
  await mongoose.disconnect();
}
cleanup();
