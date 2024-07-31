import mongoose from 'mongoose';

// Create a schema for revenue
const revenueSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
    maxlength: 4
  },
  revenue: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Create a model
export const Revenue = mongoose.models.Revenue || mongoose.model('Revenue', revenueSchema);
