import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { requireAuth } from "../../utils/requireAuth";

const Icons = () => {
  const navigate = useNavigate();
  const [showLogInRegister, setShowLogInRegister] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function handleAddProduct(e) {
    e.preventDefault();

    const ok = await requireAuth(navigate, "/add-product");

    if (ok) {
      navigate("/add-product");
    }
  }
  useEffect(() => {
    async function checkLogin() {
      try {
        await API.get("/check");
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    }

    checkLogin();
  }, []);

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
