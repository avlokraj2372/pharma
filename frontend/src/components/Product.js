import "../styles/Product.css";

const Product = ({ imgsrc, title, indication, dosage, sideEffects, price, productId, onAddToCart }) => {
  return (
    <div className="product">
      <img src={imgsrc} alt={title} />
      <div className="product__info">
        <p style={{fontWeight: "bold", fontSize: "22px"}} className="info__name mt-4">{title}</p>

        {/* <p className="info__description"><span style={{fontWeight: "bold", fontSize: "14px"}}>Indication: </span>{indication}</p>
        <p className="info__description"><span style={{fontWeight: "bold", fontSize: "14px"}}>Dosage: </span>{dosage}</p>
        <p className="info__description"><span style={{fontWeight: "bold", fontSize: "14px"}}>Side Effects: </span>{sideEffects}</p> */}

        <p className="info__price">₹{price}</p>

        <button onClick={onAddToCart} className="info__button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
