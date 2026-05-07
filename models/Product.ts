import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subTitle: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  features: [{ type: String }],
  keyFeatures: [{ type: String }],
  specifications: { type: mongoose.Schema.Types.Mixed },
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
