import React, { useReducer, useState } from "react";
import "../css/table.css";
import { useContext } from "react";
import { BtnContext } from "../context/BtnContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { state, dispatch } = useContext(BtnContext);

  return (
    <>
      <div className="container">
        <h2 className="">Products in Cart</h2>
        {state.cart.length === 0 ? (
          <p className="text-black ">Nothing in the cart</p>
        ) : (
          <table class="table table-striped ">
            {state.cart.map((product) => {
              console.log(product);

              return (
                <tbody key={product._id}>
                  <tr>
                    <td className="align-middle">
                      <img
                        src={product.image?.url || "/default-image.png"}
                        className="image"
                        alt={product.title}
                      />
                    </td>

                    <td className="align-middle">
                      {product.title}
                      <br />

                      <p
                        className="text-danger"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product._id,
                          })
                        }
                      >
                        Remove
                      </p>
                    </td>

                    <td className="align-middle">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            payload: product._id,
                          })
                        }
                      >
                        -
                      </button>

                      <span className="ms-1 me-2">{product.quantity}</span>

                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({
                            type: "INCREASE_QUANTITY",
                            payload: product._id,
                          })
                        }
                      >
                        +
                      </button>
                    </td>

                    <td className="align-middle">Rs. {product.price}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default Cart;
