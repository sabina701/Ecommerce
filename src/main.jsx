import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import BtnProvider from "./context/BtnContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <BtnProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BtnProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);
