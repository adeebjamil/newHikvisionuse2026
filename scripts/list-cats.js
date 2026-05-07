const mongoose = require('mongoose');
require('dotenv').config();

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const cats = await Category.find({});
  console.log(cats.map(c => ({ name: c.name, slug: c.slug })));
  process.exit();
}

check();
