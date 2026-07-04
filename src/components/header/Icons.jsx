import React from "react";
import { Link } from "react-router-dom";
const Icons = () => {
  return (
    <div className="icons">
      <ul>
        <li>
          <Link to="/cart">
            <i class="bi bi-cart"></i>
          </Link>
        </li>
        <li>
          <i class="bi bi-person"></i>
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
