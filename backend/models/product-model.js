const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Price cannot be negative
    },
    description: { 
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Stock cannot be negative
    },
    colors: {
        type: [String], // Array of strings for colors
        default: [], // Default to an empty array
    },
    images: {
        type: [String], // Array of strings for image URLs
        default: [], // Default to an empty array
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
