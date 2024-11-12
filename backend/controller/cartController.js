// controllers/cartController.js
import { addCartItem, removeCartItem, getCartItems } from '../models/cartModel.js';

// Add item to cart
export const addItemToCart = async (req, res) => {
    console.log("request",req.body)
    try {
      const { totalprice, quantity, m_id, u_id } = req.body; // Extract the required fields
      const item = { totalprice, quantity, m_id, u_id }; // Create item object
  
      const result = await addCartItem(item);
      res.status(201).json({ message: 'Item added to cart', data: result });
    } catch (error) {
      console.error('Error adding item to cart:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error adding item to cart', error });
    }
  };
  

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const result = await removeCartItem(cart_id);
    res.status(200).json({ message: 'Item removed from cart', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

// Get all items in cart
export const getAllCartItems = async (req, res) => {
  try {
    const { u_id } = req.params;
    const items = await getCartItems(u_id);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
};
