// import "../styles/CartScreen.css";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import StripeCheckout from "react-stripe-checkout";

// // Components
// import CartItem from "../components/CartItem";

// // Actions
// import { addToCart, removeFromCart } from "../redux/actions/cartActions";

// const CartScreen = () => {
//   const dispatch = useDispatch();
//   const [showPopup, setShowPopup] = useState(false); // State for showing the success message

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   useEffect(() => { }, []);

//   const qtyChangeHandler = (id, qty) => {
//     dispatch(addToCart(id, qty));

//     // Show pop-up for 2 seconds when an item is added to the cart
//     setShowPopup(true);
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 2000);
//   };

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
//   };

//   const getCartSubTotal = () => {
//     return cartItems
//       .reduce((price, item) => price + item.price * item.qty, 0)
//       .toFixed(2);
//   };

//   const makePayment = token => {
//     const body = {
//       token,
//       product: cartItems,
//       price: getCartSubTotal()
//     };
//     const headers = {
//       "content-type": "application/json"
//     };

//     return fetch(`http://localhost:5000/payment`, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body)
//     }).then(response => {
//       console.log("RESPONSE", response);
//       const { status } = response;
//       console.log("status", status);

//       // Empty the cart after successful payment
//       cartItems.forEach(item => dispatch(removeFromCart(item.product)));
//     }).catch(error => {
//       console.log("ERROR", error);
//     });
//   };

//   return (
//     <>
//       <div className="cartscreen" style={{ marginBottom: "460px" }}>
//         <div className="cartscreen__left">
//           <h2>Shopping Cart</h2>

//           {cartItems.length === 0 ? (
//             <div>
//               Your Cart Is Empty <Link to="/">Go Back</Link>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <CartItem
//                 key={item.product}
//                 item={item}
//                 qtyChangeHandler={qtyChangeHandler}
//                 removeHandler={removeFromCartHandler}
//               />
//             ))
//           )}
//         </div>

//         <div className="cartscreen__right">
//           <div className="cartscreen__info">
//             <p>Subtotal ({getCartCount()}) items</p>
//             <p>TOTAL(INR) : ₹{getCartSubTotal()} </p>
//             <p>TOTAL(USD) : ${getCartSubTotal() * 0.014} </p>
//           </div>
//           <div>
//             <button type="button" onClick={function() {
//               console.log(process.env.REACT_APP_KEY);
//             }}>
//               <StripeCheckout
//                 stripeKey="pk_test_51IPsBgEwEbzzqba9A4AQsmpCvFKjJbN9AyCrLYwCykIR1XTe8mFHcRQB6qWHz1Y6D8XZSK0gHi2CIr92nDzrs07f00W0hXIIRv"
//                 token={makePayment}
//                 amount={getCartSubTotal() * 100 * 0.014}
//                 shippingAddress
//                 billingAddress
//                 name="Buy Products"
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Pop-Up */}
//       {showPopup && (
//         <div className="popup">
//           <p>Item added to cart successfully!</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CartScreen;
import "../styles/CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); // State for showing the success message
  const [address, setAddress] = useState(""); // State for user address
  const [phoneNumber, setPhoneNumber] = useState(""); // State for user phone number

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));

    // Show pop-up for 2 seconds when an item is added to the cart
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  // Handle Cash on Delivery payment
  const handleCashOnDelivery = () => {
    if (!address || !phoneNumber) {
      alert("Please enter your address and phone number.");
      return;
    }

    const orderDetails = {
      cartItems,
      totalAmount: getCartSubTotal(),
      paymentMethod: "Cash on Delivery",
      deliveryAddress: address,
      contactNumber: phoneNumber,
    };

    console.log("Order details: ", orderDetails);
    // You can dispatch actions to create an order or make an API request for this order

    // Empty the cart after successful order placement
    cartItems.forEach(item => dispatch(removeFromCart(item.product)));
    alert("Your order has been placed with Cash on Delivery.");
  };

  return (
    <>
      <div className="cartscreen" style={{ marginBottom: "460px" }}>
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>TOTAL(INR) : ₹{getCartSubTotal()} </p>
            <p>TOTAL(USD) : ${getCartSubTotal() * 0.014} </p>
          </div>
          <div>
            {/* Address and Phone Number Form */}
            <h3>Delivery Information</h3>
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="address-input"
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your contact number"
                className="phone-input"
              />
            </label>
            {/* Cash on Delivery Button */}
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {/* Success Pop-Up */}
      {showPopup && (
        <div className="popup">
          <p>Item added to cart successfully!</p>
        </div>
      )}
    </>
  );
};

export default CartScreen;

