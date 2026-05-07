import mongoose from "mongoose";

const productEnquirySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'resolved'], 
    default: 'unread' 
  },
  createdAt: { type: Date, default: Date.now }
});

export const ProductEnquiry = mongoose.models.ProductEnquiry || mongoose.model("ProductEnquiry", productEnquirySchema);
