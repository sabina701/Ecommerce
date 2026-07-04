import React from "react";
import Header from "../components/header/Header";
import Carousel from "../components/carousel/Carousel";
import FlashSales from "../components/flashsales/FlashSales";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FlashSales />
    </div>
  );
};

export default Home;
