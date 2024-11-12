// routes/cartRoutes.js
import express from 'express';
import { addItemToCart, removeItemFromCart, getAllCartItems } from '../controller/cartController.js';

const router = express.Router();

// Route to add item to cart
router.post('/', addItemToCart);

// Route to remove item from cart
router.delete('/:cart_id', removeItemFromCart);

// Route to get all cart items
router.get('/:u_id', getAllCartItems);

export default router;
