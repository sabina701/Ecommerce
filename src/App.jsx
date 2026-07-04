import React, { useState } from "react";

import MyRoute from "./MyRoute";
import "./css/App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <MyRoute />
    </div>
  );
};

export default App;
