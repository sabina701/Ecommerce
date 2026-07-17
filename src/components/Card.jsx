import React from "react";

import Btn from "./Btn";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/details/" + product.id);
  }
  return (
    <div className="card all-card " onClick={handleClick}>
      <img
        src={product.images[0] || product.images[1]}
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body my-card-body">
        <h5 className="card-title fw-bold fs-5 title">{product.title}</h5>
        <p className="card-text text-dark description">
          {product.description.slice(0, 50)}
        </p>
        <p className="card-text text-dark fw-bold">Rs. {product.price}</p>
        <div className="main-container d-flex flex-column   ">
          <Btn product={product} type="ADD_TO_CART">
            {" "}
            Add to Cart
          </Btn>
          <div className="mt-3 main-container d-flex flex-column  ">
            <Btn product={product} type="ADD_TO_WISHLIST">
              {" "}
              Add to Wishlist
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
