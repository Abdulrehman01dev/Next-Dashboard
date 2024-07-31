import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    company: String,
    color: String,
    category: String,
})


export const Product = mongoose.models.products || mongoose.model('products', schema)