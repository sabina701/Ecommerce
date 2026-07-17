import React, { useContext, useState } from "react";
import Card from "../Card";
import { ProductContext } from "../../context/ProductContext";
import Placeholder from "../../Placeholder";

const FlashSales = () => {
  const { data, loading } = useContext(ProductContext);
  const [more, setMore] = useState(4);

  return (
    <div className="container">
      <h2 className="container mt-3 mb-3">FlashSales</h2>
      <div className="row row-cols-lg-3 px-5 py-5">
        {loading
          ? Array.from({ length: more }).map((_, index) => (
              <Placeholder key={index} />
            ))
          : data
              .slice(0, more)
              .map((product) => <Card key={product.id} product={product} />)}
      </div>
      <div className=" d-flex justify-content-center align-items-center">
        <button
          className="btn btn-outline-primary w-50 mb-4 textalign-center "
          onClick={() => setMore((prev) => prev + 4)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default FlashSales;
