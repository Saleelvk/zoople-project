const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            name: {
                type: String,
            },
            quantity: {
                type: Number,
                min: 1,
            },
            price: {
                type: Number,
            },
            image: {
                type: String,
            },
        },
    ],
    total: {
        type: Number,
        min: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    shippingAddress: {
        streetAddress: {
            type: String,
        },
        town: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: String,
        },
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
