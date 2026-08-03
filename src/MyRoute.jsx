import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
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
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

const MyRoute = () => {
  return (
    <HashRouter>
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
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />

          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </HashRouter>
  );
};

export default MyRoute;
