import React, { useContext, useState } from "react";
import Card from "../Card";
import { ProductContext } from "../../context/ProductContext";
import Placeholder from "../../Placeholder";

const FlashSales = () => {
  const { data, loading } = useContext(ProductContext);

  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 4;

  // Calculate products for current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = data.slice(startIndex, endIndex);

  // Total pages
  const totalPages = Math.ceil(data.length / productsPerPage);

  return (
    <div className="container">
      <h2 className="container mt-3 mb-3">FlashSales</h2>

      <div className="row row-cols-lg-3 px-5 py-5">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, index) => (
              <Placeholder key={index} />
            ))
          : currentProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))}
      </div>

      {/* Pagination buttons */}
      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mb-4 flex-wrap">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${
                page === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashSales;
