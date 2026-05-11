const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Read .env file
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`${name}="?([^"\\n\\r]+)"?`));
  return match ? match[1] : null;
}

const MONGODB_URI = getEnvVar("MONGODB_URI");
const CLOUDINARY_CLOUD_NAME = getEnvVar("CLOUDINARY_CLOUD_NAME");
const CLOUDINARY_API_KEY = getEnvVar("CLOUDINARY_API_KEY");
const CLOUDINARY_API_SECRET = getEnvVar("CLOUDINARY_API_SECRET");

if (!MONGODB_URI || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing required environment variables in .env");
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Schemas
const categorySchema = new mongoose.Schema({
  image: String,
});
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

const subCategorySchema = new mongoose.Schema({
  image: String,
});
const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

const productSchema = new mongoose.Schema({
  images: [String],
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

async function uploadToCloudinary(localPath, folder) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: `hikvision_uae/${folder}`,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error.message);
    return null;
  }
}

async function migrate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    const publicPath = path.join(__dirname, "..", "public");

    // 1. Migrate Categories
    console.log("\n--- Migrating Categories ---");
    const categories = await Category.find({ image: { $regex: /^\/uploads\// } });
    console.log(`Found ${categories.length} categories to migrate.`);
    for (const cat of categories) {
      const localFile = path.join(publicPath, cat.image);
      if (fs.existsSync(localFile)) {
        console.log(`Uploading ${cat.image}...`);
        const url = await uploadToCloudinary(localFile, "categories");
        if (url) {
          cat.image = url;
          await cat.save();
          console.log(`✅ Updated Category: ${cat._id}`);
        }
      } else {
        console.warn(`⚠️ File not found: ${localFile}`);
      }
    }

    // 2. Migrate SubCategories
    console.log("\n--- Migrating SubCategories ---");
    const subCategories = await SubCategory.find({ image: { $regex: /^\/uploads\// } });
    console.log(`Found ${subCategories.length} subcategories to migrate.`);
    for (const sub of subCategories) {
      const localFile = path.join(publicPath, sub.image);
      if (fs.existsSync(localFile)) {
        console.log(`Uploading ${sub.image}...`);
        const url = await uploadToCloudinary(localFile, "subcategories");
        if (url) {
          sub.image = url;
          await sub.save();
          console.log(`✅ Updated SubCategory: ${sub._id}`);
        }
      } else {
        console.warn(`⚠️ File not found: ${localFile}`);
      }
    }

    // 3. Migrate Products
    console.log("\n--- Migrating Products ---");
    const products = await Product.find({ images: { $elemMatch: { $regex: /^\/uploads\// } } });
    console.log(`Found ${products.length} products to migrate.`);
    for (const prod of products) {
      const newImages = [...prod.images];
      let updated = false;
      for (let i = 0; i < newImages.length; i++) {
        if (newImages[i].startsWith("/uploads/")) {
          const localFile = path.join(publicPath, newImages[i]);
          if (fs.existsSync(localFile)) {
            console.log(`Uploading ${newImages[i]} for product ${prod._id}...`);
            const url = await uploadToCloudinary(localFile, "products");
            if (url) {
              newImages[i] = url;
              updated = true;
            }
          } else {
            console.warn(`⚠️ File not found: ${localFile}`);
          }
        }
      }
      if (updated) {
        prod.images = newImages;
        await prod.save();
        console.log(`✅ Updated Product: ${prod._id}`);
      }
    }

    console.log("\n🎉 Migration complete!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

migrate();
