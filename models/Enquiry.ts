import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productSlug: { type: String, required: true },
  productImage: { type: String },
  productPath: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Resolved'] },
  createdAt: { type: Date, default: Date.now }
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
