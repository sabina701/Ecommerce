import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import { ProductContext } from "../context/ProductContext";
import Placeholder from "../Placeholder";

const Products = () => {
  const { data, loading } = useContext(ProductContext);

  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 4;

  // Search and sort from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";

  // Filter products
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort products
  const sortedProducts = [...filteredProducts];

  if (sort === "price_asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else {
    // newest first
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  // Pagination calculation
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Total pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="container">
      <h2 className="container">
        {search ? `Search results for: ${search}` : "Products"}
      </h2>

      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={sort}
          onChange={(e) => {
            setSearchParams({
              search,
              sort: e.target.value,
            });

            // go back to first page when sort changes
            setPage(1);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

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

export default Products;
