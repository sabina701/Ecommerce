import React, { useEffect, useState } from "react";
import "../css/category.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleClick(id) {
    navigate("/category-products/" + id);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();
        setData(result);
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
      {data.slice(0, 5).map((item) => (
        <div
          className="card"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <img src={item.image} alt={item.name} className="category-image" />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
