const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Define schemas manually to avoid import issues in a simple node script
const CategorySchema = new mongoose.Schema({ name: String });
const SubCategorySchema = new mongoose.Schema({ name: String, category: mongoose.Schema.Types.ObjectId });
const ProductSchema = new mongoose.Schema({ name: String, subCategory: mongoose.Schema.Types.ObjectId });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const pCount = await Product.countDocuments();
    const subCount = await SubCategory.countDocuments();
    console.log(`Total Products: ${pCount}`);
    console.log(`Total SubCategories: ${subCount}`);

    const subs = await SubCategory.find().limit(5);
    for (const sub of subs) {
      const pInSub = await Product.countDocuments({ subCategory: sub._id });
      console.log(`SubCategory: ${sub.name} (${sub._id}) has ${pInSub} products`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
