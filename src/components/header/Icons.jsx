import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";
const Icons = () => {
  const [showLogInRegister, setShowLogInRegister] = useState(false);
  return (
    <div className="icons">
      <ul>
        <li>
          <Link to="/cart">
            <i class="bi bi-cart"></i>
          </Link>
        </li>
        <li>
          <i
            class="bi bi-person"
            onClick={() => setShowLogInRegister((prev) => !prev)}
          ></i>
          {showLogInRegister && <LoginRegister />}
        </li>
        <li>
          <Link to="/wishlist">
            <i class="bi bi-heart"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Icons;
