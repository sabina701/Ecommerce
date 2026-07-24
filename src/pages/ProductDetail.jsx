import React from "react";
import Rating from "./Rating";
import API from "../api/axios";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [noOfItem, setNoOfItem] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.get(`/products/${id}`);
        setData(response.data.product);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [id]);

  const totalPrice = useMemo(() => {
    return (data.price || 0) * noOfItem;
  }, [data.price, noOfItem]);
  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="left col-md-4 col-sm-12 detail-img">
            <img src={data.image?.url} alt={data.title} />
          </div>
          <div className="center col-md-4  col-sm-12 ">
            <h2>{data.title}</h2>
            <Rating />
            <p className="price">Price: Rs. {data.price}</p>

            <p className="strike-price">Rs. {parseInt(data.price) + 100}</p>

            <p>Quantity: {noOfItem}</p>

            <h3>Total: Rs. {totalPrice}</h3>
            <p className="text-dark fs-4">Color:</p>
            <p>
              <button className="btn btn-primary">Black</button>
              <button className="btn btn-info ms-3">Gray</button>
            </p>
            <p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (noOfItem > 1) {
                    setNoOfItem((prev) => prev - 1);
                  }
                }}
              >
                -
              </button>
              <span className="text-dark m-2">{noOfItem}</span>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setNoOfItem((prev) => prev + 1);
                }}
              >
                +
              </button>
            </p>
            <p>
              <button className="btn btn-info ">Buy Now</button>
              <button className="btn btn-success ms-3">Add to Cart</button>
            </p>
          </div>
          <div className="right col-md-4 col-sm-12">
            <div className="first-one p-3">
              <p className="text-dark fw-bold fs-3">Delivery Options</p>
              <p className="text-dark">Kathmandu , Bagmati</p>
              <p className="text-dark">Standard Delivery: Rs.170</p>
              <p className="text-dark">Cash on Delivery Available</p>
            </div>
            <div className="second-one p-3 mb-3">
              <p className="text-dark fw-bold">Return & Warrantly</p>
              <p className="text-dark">14 Days Free Returns</p>
              <p className="text-dark">No Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
