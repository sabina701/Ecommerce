import React, { useEffect, useState } from "react";
import "../css/category.css";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleClick(categoryName) {
    navigate("/category-products/" + categoryName);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories");

        setData(response.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="card-container my-card">
      {data.map((category) => (
        <div
          className="card"
          key={category._id}
          onClick={() => handleClick(category.name)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />

          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
