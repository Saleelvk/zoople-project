const Order = require('../models/order-model');
const Cart = require('../models/cart-model');
const asyncHandler = require('express-async-handler');

module.exports = {

createOrder : asyncHandler(async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
    
            // Find the cart and populate product details
            const cart = await Cart.findOne({ user: user._id }).populate('items.product');
            if (!cart || cart.items.length === 0) {
                return res.status(404).json({ message: 'Cart is empty or not found' });
            }
    
            // Recalculate cart total
            let cartTotal = 0;
            cart.items.forEach(item => {
                if (!item.product) {
                    throw new Error(`Product not found for cart item with quantity ${item.quantity}`);
                }
                cartTotal += item.quantity * item.price;
            });
    
            // Extract shipping address fields
            const { streetAddress, town, state, pinCode } = req.body.shippingAddress || {};
    
            // Create a new order
            const order = new Order({
                user: user._id,
                items: cart.items.map((item) => {
                    if (!item.product) {
                        throw new Error('Product not found while creating order.');
                    }
                    return {
                        product: item.product._id,
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.product?.images?.[0] || '',
                    };
                }),
                total: cartTotal,
                shippingAddress: { streetAddress, town, state, pinCode },
                status: 'Pending', // Default status is pending
            });
    
            const createdOrder = await order.save();
    
            // Clear the cart
            cart.items = [];
            cart.total = 0;
            await cart.save();
    
            res.status(201).json({ message: 'Order created successfully', order: createdOrder });
        } catch (error) {
            console.error('Error creating order:', error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }),
    

    myOrders: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
        if (!orders) { 
            res.status(401);
            throw new Error('No orders found');
        }
        res.status(200).json({ orders: orders });
    }),

    //view orders by admin
    getOrders: asyncHandler(async (req, res) => {
        const orders = await Order.find({}).populate('user', 'username',).sort({ createdAt: -1 });
        res.status(200).json({ orders: orders });

        if (!orders) {
            res.status(400);
            throw new Error('No orders found');
        }
    }),

    // get latest 3 orders
 


    //update order by admin
    updateOrder: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        //find the order 
        const order = await Order.findById(id);
        if (!order) {
            res.status(400);
            throw new Error('Order not found');
        }

        //update the order
        order.status = status;
        const updatedOrder = await order.save();
        res.status(200).json({ message: 'Order updated', order: updatedOrder });
    })
}