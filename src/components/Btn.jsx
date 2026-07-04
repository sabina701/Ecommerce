import React, { useContext } from "react";
import { BtnContext } from "../context/BtnContext";
const Btn = ({ children, product, type }) => {
  const { dispatch } = useContext(BtnContext);
  function handleClick(event) {
    event.stopPropagation();
    if (type === "ADD_TO_CART") {
      dispatch({
        type: "ADD_TO_CART",
        payload: product,
      });
    }

    if (type === "ADD_TO_WISHLIST") {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: product,
      });
    }
  }

  return (
    <>
      <button
        className="btn btn-info ms-2 text-white fs-5"
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
};

export default Btn;
