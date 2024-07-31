import mongoose from 'mongoose';

// Create a schema for customers
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    maxlength: 255
  },
  image_url: {
    type: String,
    required: true,
    maxlength: 255
  }
}, { timestamps: true });

// Create a model
export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);