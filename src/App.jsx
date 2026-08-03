import React, { useState } from "react";

import MyRoute from "./MyRoute";
import "./css/App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <MyRoute />
    </div>
  );
};

export default App;
