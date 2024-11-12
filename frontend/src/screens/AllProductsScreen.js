import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import Product from "../components/Product";

// Pop-up Component
const Popup = ({ message }) => {
  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
};

function AllProductsScreen() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // To manage pop-up visibility
  const [popupMessage, setPopupMessage] = useState(""); // To hold the message for the pop-up
  const dispatch = useDispatch();

  // Fetch all medicines from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/medicine");
        setMedicines(response.data); // Set fetched data to the state
        setLoading(false); // Data fetched successfully, stop loading
      } catch (err) {
        setError('Error fetching medicines');
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []); // Empty dependency array means this effect runs once on component mount

  //http://localhost:5000/products/diabetics
  // Handler to add item to cart
  const addToCartHandler = async(productId, productName, totalprice) => {
    // totalprice, quantity, m_id 
    dispatch(addToCart(productId, 1)); // Add 1 item to cart
    setPopupMessage(`${productName} added to cart!`); // Set custom message
    setShowPopup(true); // Show the pop-up

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homescreen">
      <div className="container text-center">
        <h1 className="mt-3">Products</h1>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Display the pop-up if showPopup is true */}
      {showPopup && <Popup message={popupMessage} />}

      <div className="homescreen__products">
        {medicines.map((val) => (
          <Product
            key={val.m_id}
            imgsrc={val.image_url} 
            title={val.medName} 
            price={val.price}   
            productId={val.m_id}  
            onAddToCart={() => addToCartHandler(val.m_id, val.medName,val.price)} // Pass product name for custom message
          />
        ))}
      </div>
    </div>
  );
}

export default AllProductsScreen;
