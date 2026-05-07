const mongoose = require('mongoose');
require('dotenv').config();

const subCategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
});

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const subs = await SubCategory.find({});
  console.log(subs.map(s => s.name));
  process.exit();
}

check();
