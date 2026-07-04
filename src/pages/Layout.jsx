import React from "react";
import Home from "./Home";
import { Outlet } from "react-router-dom";
import Footer from "./FooterPage";
import Header from "../components/header/Header";
import "../css/index.css";

const Layout = () => {
  return (
    <div className="my-all-componet">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
