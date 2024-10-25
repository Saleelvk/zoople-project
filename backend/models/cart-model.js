const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

// Method to calculate total price
cartSchema.methods.calculateTotal = function () {
    this.total = this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    return this.total;
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
