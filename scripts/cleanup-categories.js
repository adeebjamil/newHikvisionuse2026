const mongoose = require('mongoose');
require('dotenv').config();

async function cleanupDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const db = mongoose.connection.db;
    const Category = db.collection('categories');
    const SubCategory = db.collection('subcategories');
    const Product = db.collection('products');

    const categorySlugs = ['cctv-assesories', 'cctv-camera'];

    for (const slug of categorySlugs) {
      const cat = await Category.findOne({ slug });
      if (cat) {
        console.log(`Found category: ${cat.name} (${cat._id})`);
        
        // Find subcategories
        const subcats = await SubCategory.find({ category: cat._id }).toArray();
        const subcatIds = subcats.map(s => s._id);
        console.log(`Found ${subcats.length} subcategories to remove.`);

        // Delete products in these subcategories or this category
        const p1 = await Product.deleteMany({ category: cat._id });
        const p2 = await Product.deleteMany({ category: cat._id.toString() });
        const p3 = await Product.deleteMany({ subCategory: { $in: subcatIds } });
        const p4 = await Product.deleteMany({ subCategory: { $in: subcatIds.map(id => id.toString()) } });
        
        console.log(`Deleted products: ${p1.deletedCount + p2.deletedCount + p3.deletedCount + p4.deletedCount}`);

        // Delete subcategories
        const sResult = await SubCategory.deleteMany({ category: cat._id });
        const sResult2 = await SubCategory.deleteMany({ category: cat._id.toString() });
        console.log(`Deleted subcategories: ${sResult.deletedCount + sResult2.deletedCount}`);

        // Delete category
        const cResult = await Category.deleteOne({ _id: cat._id });
        console.log(`Deleted category: ${cat.name}`);
      } else {
        console.log(`Category with slug ${slug} not found.`);
      }
    }

    console.log('Cleanup complete.');
    process.exit(0);
  } catch (error) {
    console.error('Cleanup error:', error);
    process.exit(1);
  }
}

cleanupDB();
