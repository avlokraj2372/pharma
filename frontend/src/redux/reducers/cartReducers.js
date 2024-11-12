// reducers/cartReducers.js

import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the item already exists in the cart
      const item = action.payload;
      const exists = state.cartItems.find((x) => x.product === item.product);

      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exists.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};
