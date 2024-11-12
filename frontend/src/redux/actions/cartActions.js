// actions/cartActions.js

import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

// Add item to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:5000/api/medicine/${id}`);
  const data = await response.json();

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.m_id,
      title: data.medName,
      price: data.price,
      image: data.image_url,
      qty,
    },
  });

  // Save the updated cart to localStorage (optional)
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove item from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  // Save the updated cart to localStorage (optional)
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
