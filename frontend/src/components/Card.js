import { useEffect, useState } from "react";
import "../styles/Product.css";
import { Link } from "react-router-dom";

function Card({ imgsrc, title, info, link, id }) {
  return (
    <div className="product">
      {/* {cartData.map((d,index) => (
        <div key={index}>{d.quantity}</div>
      ))} */}
      <img src={imgsrc} alt={title} />
      <div className="product__info mt-2 " style={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
        <p style={{fontWeight: "bold",fontSize:"20px",marginBottom:"4px"}} className="info__name ">{title}</p>

        <p style={{fontSize:"15px"}} className="info__description ">{info}</p>

        {/* <Link to={`/product/{id}`} className="info__button"> */}
        <Link to={link} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
}

export default Card;
