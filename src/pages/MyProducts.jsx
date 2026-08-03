import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyProducts() {
      try {
        const response = await API.get("/products/my");
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>You have not added any products yet.</p>
      ) : (
        <div className="row row-cols-lg-3 g-4">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
