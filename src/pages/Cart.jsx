import React, { useReducer, useState } from "react";
import "../css/table.css";
import { useContext } from "react";
import { BtnContext } from "../context/BtnContext";

const Cart = () => {
  const { state, dispatch } = useContext(BtnContext);

  return (
    <>
      <h2 className="text-center">Products in Cart</h2>
      <div className="container">
        <table class="table table-striped ">
          {state.cart.map((product) => (
            <tbody>
              <tr key={product.id}>
                <td className="align-middle">
                  <img
                    src={product.images[0] || product.images[1]}
                    w-100
                    className="image"
                  />
                </td>
                <td className="align-middle">
                  {product.title}
                  <br /> <p className="text-danger">Remove</p>
                </td>

                <td className="align-middle">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QUANTITY",
                        payload: product.id,
                      })
                    }
                  >
                    -
                  </button>{" "}
                  <span className="ms-1 me-2">{product.quantity}</span>
                  <button
                    className="btn btn-primary ms-1 me-2"
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QUANTITY",
                        payload: product.id,
                      })
                    }
                  >
                    +
                  </button>
                </td>
                <td className="align-middle">Rs. {product.price}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Cart;
