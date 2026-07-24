import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await API.get("/products");

      setData(response.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProduct(id) {
    try {
      await API.delete(`/products/${id}`);
      //whenever it will delete successfully by mongodb which is backend then oly this this code code will run
      setData((prev) => prev.filter((product) => product._id !== id));

      toast.success("Product deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  }

  async function updateProduct(id, updatedData) {
    try {
      const response = await API.put(`/products/${id}`, updatedData);

      setData((prev) =>
        prev.map((product) =>
          product._id === id ? response.data.product : product,
        ),
      );

      toast.success("Product updated successfully");

      return response;
    } catch (err) {
      console.log(err);
      toast.error("Failed to update product");
      throw err;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        data,
        loading,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
