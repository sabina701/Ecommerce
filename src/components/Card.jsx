import React from "react";
import Btn from "./Btn";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/details/" + product.id);
  }
  return (
    <div className="card " onClick={handleClick}>
      <img
        src={product.images[0] || product.images[1]}
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold fs-5">{product.title}</h5>
        <p className="card-text text-dark">
          {product.description.slice(0, 50)}
        </p>
        <p className="card-text text-dark fw-bold">Rs. {product.price}</p>
        <Btn product={product} type="ADD_TO_CART">
          {" "}
          Add to Cart
        </Btn>
        <Btn product={product} type="ADD_TO_WISHLIST">
          {" "}
          Add to Wishlist
        </Btn>
      </div>
    </div>
  );
};

export default Card;
