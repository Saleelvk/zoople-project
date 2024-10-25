const Cart = require('../models/cart-model');
const asyncHandler = require('express-async-handler');
const Product = require('../models/product-model');

module.exports = { 
    getCart: asyncHandler(async (req, res) => { 
        const user = req.user;

        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        //find cart by user
        const cart = await Cart.findOne({ user: user._id }).populate('items.product', 'name price images');
        if (!cart) {
            res.status(401);
            throw new Error('Cart not found');
        }

        res.status(200).json(cart);
  
    }),




    addToCart: asyncHandler(async (req, res) => {
        const user = req.user;
    
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
    
        // Destructure productId and quantity from req.body
        const { productId, quantity } = req.body;
    
        if (!productId || !quantity || quantity === 0) {
            return res.status(400).json({ message: 'Product ID and a valid quantity are required' });
        }
    
        // Find product in the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        // Find the user's cart
        let cart = await Cart.findOne({ user: user._id });
    
        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({ user: user._id, items: [] });
        }
    
        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    
        if (itemIndex > -1) {
            // If item exists in the cart, update the quantity
            const existingItem = cart.items[itemIndex];
    
            // Calculate new quantity
            const newQuantity = existingItem.quantity + quantity;
    
            if (newQuantity <= 0) {
                // Remove the item if quantity becomes 0 or less
                const previousTotalPrice = existingItem.price;
                cart.items.splice(itemIndex, 1);
                cart.total -= previousTotalPrice;
            } else {
                // Update the quantity and total price
                const previousTotalPrice = existingItem.price;
                existingItem.quantity = newQuantity;
                existingItem.price = newQuantity * product.price;
                cart.total += existingItem.price - previousTotalPrice;
            }
        } else if (quantity > 0) {
            // If the item doesn't exist in the cart, add it
            const totalPrice = product.price * quantity;
            cart.items.push({
                product: productId,
                quantity,
                price: totalPrice,
            });
    
            // Update the total field in the cart
            cart.total += totalPrice;
        }
    
        // Save the cart
        const updatedCart = await cart.save();
    
        res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
    }),
    
  
    removeFromCart: asyncHandler(async (req, res) => {
        const user = req.user;
    
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }
    
        const { id } = req.params;
    
        // Find the user's cart
        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            res.status(400);
            throw new Error('Cart not found');
        }
    
        // Find the item to be removed
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === id);
    
        if (itemIndex > -1) {
            const itemToRemove = cart.items[itemIndex];
    
            // Remove the item and update the total price of the cart
            cart.total -= itemToRemove.price; // Deduct the item's price from the total
            cart.items.splice(itemIndex, 1);   // Remove the item from the cart
    
            // Save cart
            const updatedCart = await cart.save();
            res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
        } else {
            res.status(400);
            throw new Error('Item not found in cart');
        }
    })
    

}