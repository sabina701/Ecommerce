import React, { useContext, useState } from "react";
import { BtnContext } from "../context/BtnContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { state, dispatch } = useContext(BtnContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery",
  });

  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Simulate order success
    toast.success("Order placed successfully!");

    // Clear cart
    dispatch({ type: "CLEAR_CART" });

    // Redirect to home page after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Checkout Form */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h3>Checkout</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Payment Method</label>
                <select
                  name="paymentMethod"
                  className="form-select"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option>Cash on Delivery</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h4>Order Summary</h4>

            {state.cart.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>Rs. {totalPrice}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
