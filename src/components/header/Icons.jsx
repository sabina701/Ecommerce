import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import { AuthContext } from "../../context/AuthContext";
import { requireAuth } from "../../utils/requireAuth";

const Icons = () => {
  const navigate = useNavigate();
  const [showLogInRegister, setShowLogInRegister] = useState(false);

  // Use global auth state
  const { currentUser } = useContext(AuthContext);

  const isLoggedIn = !!currentUser;

  async function handleAddProduct(e) {
    e.preventDefault();

    const ok = await requireAuth(navigate, "/add-product");

    if (ok) {
      navigate("/add-product");
    }
  }

  return (
    <div className="icons">
      <ul>
        <li>
          <Link
            to="/add-product"
            onClick={handleAddProduct}
            style={{ color: "white" }}
          >
            Add a Product
          </Link>
          &nbsp;&nbsp;
          <Link to="/cart">
            <i className="bi bi-cart"></i>
          </Link>
        </li>

        <li>
          <Link to="/my-products" style={{ color: "white" }}>
            My Products
          </Link>
        </li>

        {/* Login/Register */}
        <li>
          <i
            className="bi bi-person"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/profile");
              } else {
                setShowLogInRegister((prev) => !prev);
              }
            }}
          ></i>

          {!isLoggedIn && showLogInRegister && <LoginRegister />}
        </li>

        <li>
          <Link to="/wishlist">
            <i className="bi bi-heart"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Icons;
