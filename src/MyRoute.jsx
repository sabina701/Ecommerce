import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Layout from "./pages/Layout";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import CategoryProducts from "./pages/CategoryProducts";
const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category-products/:id" element={<CategoryProducts />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MyRoute;
