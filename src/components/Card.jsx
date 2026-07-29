import React, { useContext } from "react";
import Btn from "./Btn";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext);

  function handleClick() {
    navigate("/details/" + product._id);
  }
  async function handleDelete(e, id) {
    e.stopPropagation();

    try {
      await API.get("/check");
      await deleteProduct(id);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else if (err.response?.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to delete product");
      }
    }
  }
  async function handleEdit(e, id) {
    e.stopPropagation();

    try {
      await API.get("/check");

      navigate("/edit/" + id);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
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
            onClick={(e) => handleEdit(e, product._id)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger mt-3"
            onClick={(e) => handleDelete(e, product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
