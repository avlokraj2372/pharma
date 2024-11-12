import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import Product from "../components/Product";
import axios from "axios";

const FractureScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const categoryId = 22; // Replace with the actual category ID for Dental

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

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId, 1));
  };

  return (
    <div className="homescreen">
      <div className="container text-center">
        <h1 className="mt-3">Fracture Products</h1>
        <hr className="w-25 mx-auto" />
      </div>
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
              onAddToCart={() => addToCartHandler(product.m_id)} // Pass handler to Product
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FractureScreen;
