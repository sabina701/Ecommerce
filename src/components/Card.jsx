import React, { useContext } from "react";
import Btn from "./Btn";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useContext(ProductContext);

  function handleClick() {
    navigate("/details/" + product._id);
  }

  return (
    <div className="card all-card" onClick={handleClick}>
      <img
        src={product.image.url}
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body my-card-body">
        <h5 className="card-title fw-bold fs-5 title">{product.title}</h5>

        <p className="card-text text-dark description">
          {product.description.slice(0, 50)}
        </p>

        <p className="card-text text-dark fw-bold">Rs. {product.price}</p>

        <div className="main-container d-flex flex-column">
          <Btn product={product} type="ADD_TO_CART">
            Add to Cart
          </Btn>

          <div className="main-container d-flex flex-column mt-3">
            <Btn product={product} type="ADD_TO_WISHLIST">
              Add to Wishlist
            </Btn>
          </div>
          <button
            className="btn btn-warning mt-3"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/edit/" + product._id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mt-3"
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(product._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
