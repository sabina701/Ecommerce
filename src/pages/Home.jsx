import React from "react";
import axios from "axios";
import Header from "../components/header/Header";
import Carousel from "../components/carousel/Carousel";
import FlashSales from "../components/flashsales/FlashSales";
import { useEffect } from "react";
import API from "../api/axios";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FlashSales />
    </div>
  );
};

export default Home;
