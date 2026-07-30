import React from "react";
import Rating from "./Rating";
import API from "../api/axios";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [noOfItem, setNoOfItem] = useState(1);
  const [validated, setValidated] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

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

  async function handleReviewSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await API.post(`/products/${id}/reviews`, reviewData);
      toast.success("Review added successfully");
      //To show
      const response = await API.get(`/products/${id}`);
      setData(response.data.product);
      //To show the review in down
      setReviewData({
        rating: 5,
        comment: "",
      });

      setValidated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
    }
  }
  async function handleDeleteReview(reviewId) {
    try {
      await API.delete(`/products/${id}/reviews/${reviewId}`);

      toast.success("Review deleted successfully");

      // Refresh product data
      const response = await API.get(`/products/${id}`);
      setData(response.data.product);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row ">
          <div className="left col-md-4 col-sm-12 detail-img ">
            <img
              src={data.image?.url}
              alt={data.title}
              style={{ height: "510px", width: "100%" }}
            />
          </div>
          <div className="center col-md-4  col-sm-12  ">
            <h3>Owned By @{data.owner?.username}</h3>
            <br />
            <h4>{data.title}</h4>
            <br />
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

        <div className="col-8 offset-3">
          <hr />
          <h4>Leave a Review</h4>
          <form
            noValidate
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            onSubmit={handleReviewSubmit}
          >
            <div className="mb-3 mt-3">
              <label for="rating" className="form-label">
                Rating
              </label>
              <input
                type="range"
                min={1}
                max={5}
                className="form-range"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    rating: e.target.value,
                  })
                }
              />

              <p>Selected Rating: {reviewData.rating}</p>
            </div>
            <div className="mb-3 mt-3">
              <label for="comment" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                value={reviewData.comment}
                required
                rows={5}
                cols={30}
                minLength={5}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    comment: e.target.value,
                  })
                }
              />
              <div className="invalid-feedback">
                Comment must be at least 5 characters.
              </div>
            </div>
            <button className="btn btn-dark">Submit</button>
          </form>
          <hr />
          <h3>Customer Reviews</h3>
          <hr />

          {data.reviews?.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            data.reviews?.map((review) => (
              <>
                <p className="text-dark">
                  <b>All Reviews</b>
                </p>
                <div className="row">
                  <div className="card col-5 mb-3">
                    <div className="card-body">
                      <h5>Jane Doe</h5>
                      <p className="card-text">{review.comment}</p>
                      <p className="card-text">{review.rating} stars</p>
                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
