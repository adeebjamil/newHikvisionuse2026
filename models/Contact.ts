import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
