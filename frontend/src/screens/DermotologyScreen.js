import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import Product from "../components/Product";
import axios from "axios";

// Pop-up Component
const Popup = ({ message }) => {
  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
};

const DermatologyScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // To manage pop-up visibility
  const [popupMessage, setPopupMessage] = useState(""); // To hold the message for the pop-up
  const dispatch = useDispatch();
  const categoryId = 18; // Replace with the actual category ID for Dermatology

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/medicine/category/${categoryId}`
        );
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const addToCartHandler = (productId, productName) => {
    dispatch(addToCart(productId, 1));
    setPopupMessage(`${productName} added to cart!`); // Set custom message
    setShowPopup(true); // Show the pop-up

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="homescreen">
      <div className="container text-center">
        <h1 className="mt-3">Dermatology Products</h1>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Display the pop-up if showPopup is true */}
      {showPopup && <Popup message={popupMessage} />}

      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product.m_id}
              imgsrc={product.image_url}
              title={product.medName}
              indication={product.indication}
              dosage={product.dosage}
              sideEffects={product.sideEffects}
              price={product.price}
              productId={product.m_id}
              onAddToCart={() => addToCartHandler(product.m_id, product.medName)} // Pass product name for custom message
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DermatologyScreen;
