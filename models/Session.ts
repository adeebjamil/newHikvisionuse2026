import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
