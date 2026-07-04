import React, { useState } from "react";
import Placeholder from "../Placeholder";
import Card from "../components/Card";
import Btn from "../components/Btn";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  function handleRemove(event, id) {
    event.stopPropagation();
    const updated = data.filter((product) => product.id !== id);
    setData(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Item removed from the wishlist");
  }

  return (
    <div className="container">
      <h2 className="container ">WishList</h2>
      {data.length === 0 && "Nothing in the Wishlist"}
      <div className="row row-cols-lg-3 px-5 py-5">
        {loading
          ? Array.from({ length: data.length }).map((_, index) => (
              <Placeholder key={index} />
            ))
          : data.map((product) => (
              <div className="card ">
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
                  <Btn product={product} type="ADD_TO_CART">
                    {" "}
                    Add to Cart
                  </Btn>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleRemove(event, product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Wishlist;
