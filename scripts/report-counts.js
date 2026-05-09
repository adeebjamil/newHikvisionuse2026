const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const uriMatch = envContent.match(/MONGODB_URI="?([^"\n\s]+)"?/);
if (!uriMatch) { console.error('No MONGODB_URI'); process.exit(1); }
const URI = uriMatch[1];

async function run() {
  await mongoose.connect(URI);
  const db = mongoose.connection.db;
  const products = await db.collection('products').countDocuments();
  const categories = await db.collection('categories').countDocuments();
  const subcategories = await db.collection('subcategories').countDocuments();
  const catList = await db.collection('categories').find({}).toArray();
  const subList = await db.collection('subcategories').find({}).toArray();
  console.log('PRODUCTS:', products);
  console.log('CATEGORIES:', categories);
  console.log('SUBCATEGORIES:', subcategories);
  console.log('CAT_NAMES:', catList.map(c => c.name + ' (' + c.slug + ')').join(' | '));
  console.log('SUB_NAMES:', subList.map(s => s.name + ' (' + s.slug + ')').join(' | '));
  await mongoose.disconnect();
}
run().catch(function(e) { console.error(e); process.exit(1); });
