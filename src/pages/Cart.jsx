import React from "react";
import "../css/table.css";
import { useContext } from "react";
import { BtnContext } from "../context/BtnContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useContext(BtnContext);
  const navigate = useNavigate();

  // Total items in cart
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of cart
  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div className="container">
        <h2>Products in Cart</h2>

        {state.cart.length === 0 ? (
          <p className="text-black">Nothing in the cart</p>
        ) : (
          <>
            <table className="table table-striped">
              {state.cart.map((product) => (
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
                        style={{ cursor: "pointer" }}
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

                    <td className="align-middle">
                      Rs. {product.price * product.quantity}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            {/* Order Summary */}
            <div className="card p-4 mt-4 shadow-sm">
              <h4>Order Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Amount</span>
                <strong>Rs. {totalPrice}</strong>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
