import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await API.get("/check");
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (!user) return <p className="text-center mt-5">Please login first.</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
            style={{ width: "60px", height: "60px", fontSize: "24px" }}
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="mb-0">{user.username}</h3>
            <p className="text-muted mb-0">{user.email}</p>
          </div>
        </div>

        <hr />

        <h5>Quick Links</h5>

        <div className="d-flex gap-3 flex-wrap mt-3">
          <Link to="/my-products" className="btn btn-outline-primary">
            My Products
          </Link>

          <Link to="/cart" className="btn btn-outline-primary">
            Cart
          </Link>

          <Link to="/wishlist" className="btn btn-outline-primary">
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
