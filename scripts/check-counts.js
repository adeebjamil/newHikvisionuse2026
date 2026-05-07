const mongoose = require('mongoose');
require('dotenv').config();

async function debugDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  const db = mongoose.connection.db;
  const productsColl = db.collection('products');
  const categoriesColl = db.collection('categories');

  const categories = await categoriesColl.find({}).toArray();
  console.log('Categories count:', categories.length);
  
  for (const cat of categories) {
    const prodCount = await productsColl.countDocuments({ category: cat._id });
    const prodCountString = await productsColl.countDocuments({ category: cat._id.toString() });
    console.log(`Category: ${cat.name} (_id: ${cat._id}) -> Products (ObjId): ${prodCount}, Products (String): ${prodCountString}`);
  }

  const sampleProduct = await productsColl.findOne({});
  console.log('Sample Product:', JSON.stringify(sampleProduct, null, 2));

  process.exit(0);
}

debugDB();
