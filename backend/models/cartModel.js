// models/cartModel.js
import db from '../config/db.js'; // Adjust the path as needed

// Function to add an item to the cart
export const addCartItem = (item) => {
  return new Promise((resolve, reject) => {
    const { totalprice, quantity, m_id, u_id } = item;
    const query = 'INSERT INTO cart (totalprice, quantity, m_id, u_id) VALUES (?, ?, ?, ?)';

    db.query(query, [totalprice, quantity, m_id, u_id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to remove an item from the cart
export const removeCartItem = (cart_id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM cart WHERE cart_id = ?';
    
    db.query(query, [cart_id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get all cart items
export const getCartItems = (u_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cart WHERE u_id = ?';

    db.query(query, [u_id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
