import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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
    async function fetchCategories() {
      try {
        const response = await API.get("/categories");
        setCategories(response.data.categories);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await API.post("/products", formData);

      toast.success(response.data.message);

      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="row mt-3 offset-3">
      <div className="col-8">
        <h3>Add Product</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label for="title" className="form-label">
              Title
            </label>
            <input
              className="form-control "
              type="text"
              placeholder="Enter Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label for="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder="Enter description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div>
            <label for="price" className="form-label mt-3">
              Enter price
            </label>
            <input
              className="form-control mb-3"
              type="number"
              placeholder="Enter Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="form-label">
              Category
            </label>

            <select
              className="form-select mb-3"
              id="category"
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

          <div>
            <label for="brand" className="form-label">
              Brand
            </label>
            <input
              className="form-control "
              type="text"
              placeholder="Enter Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label for="stock" className="form-label">
              Stock
            </label>
            <input
              className="form-control mb-3"
              type="number"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label for="image" className="form-label">
              Image
            </label>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Image URL"
              name="url"
              value={formData.image.url}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary ">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
