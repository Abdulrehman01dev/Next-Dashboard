import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    maxlength: 255
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

// Create a model
export const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
