import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Placeholder from "../Placeholder";
import Card from "../components/Card";
import API from "../api/axios";
import "../css/CategoryProducts.css";

const CategoryProducts = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [more, setMore] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(`/products/category/${id}`);

        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className="container-fluid">
        <div className="container categoryProduct-container">
          {/* <div> */}
          {loading
            ? Array.from({ length: 15 }).map((_, index) => (
                <Placeholder key={index} />
              ))
            : products
                .slice(0, more)
                .map((product) => <Card key={product._id} product={product} />)}
          {/* </div> */}
        </div>
        <div className="button-container my-btn">
          <button
            className="btn btn-outline-primary categoryProduct-button"
            onClick={() => setMore((prev) => prev + 4)}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
