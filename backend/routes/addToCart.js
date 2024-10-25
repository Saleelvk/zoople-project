const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const {
    getCart,
    addToCart,
    removeFromCart,

} = require('../controllers/cart-controller');

const router = express.Router();

// Get the user's cart
router.get('/', authMiddleware, getCart); // Ensure getCart is defined


// Add items to the cart
router.post('/', authMiddleware, addToCart); // Ensure addToCart is defined

// Remove an item from the cart
router.delete('/:id', authMiddleware, removeFromCart); // Ensure removeFromCart is defined
 
module.exports = router;
