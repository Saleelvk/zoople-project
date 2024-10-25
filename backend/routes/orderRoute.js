const express = require('express');
const { authMiddleware,adminOnly } = require('../middlewares/auth-middleware');
 
const {
  createOrder, 
  myOrders,
  getOrders, 
  updateOrder,
} = require('../controllers/order-controller');

const router = express.Router();



router.post('/', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, myOrders);

// Admin routes 
router.get('/all', authMiddleware, adminOnly, getOrders); // Corrected here
router.put('/:id', authMiddleware, adminOnly, updateOrder);

module.exports = router;
 