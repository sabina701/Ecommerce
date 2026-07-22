import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateProduct } = useContext(ProductContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: {
      filename: "product image",
      url: "",
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "url") {
      setFormData((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          url: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product
        const productResponse = await API.get(`/products/${id}`);
        setFormData(productResponse.data.product);

        // Fetch categories
        const categoryResponse = await API.get("/categories");
        setCategories(categoryResponse.data.categories);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProduct(id, formData);

      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="row mt-3 offset-3">
      <div className="col-8">
        <h3>Edit Product</h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="form-label">Title</label>

            <input
              className="form-control"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description</label>

            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="form-label">Price</label>

            <input
              className="form-control mb-3"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="form-label">Category</label>

            <select
              className="form-select mb-3"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="form-label">Brand</label>

            <input
              className="form-control"
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="form-label">Stock</label>

            <input
              className="form-control mb-3"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="form-label">Image URL</label>

            <input
              className="form-control mb-3"
              type="text"
              name="url"
              value={formData.image.url}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-warning">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
