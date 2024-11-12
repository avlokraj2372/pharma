// reducers/userReducer.js

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,  // Retrieve from localStorage if available
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        // When the user logs in, store the user info in the Redux state and in localStorage
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        return { ...state, userInfo: action.payload };
  
      case "USER_LOGOUT":
        // When the user logs out, clear the user info from Redux and localStorage
        localStorage.removeItem("userInfo");
        return { ...state, userInfo: null };
  
      default:
        return state;
    }
  };
  