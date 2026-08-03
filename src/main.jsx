import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import BtnProvider from "./context/BtnContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  // <AuthProvider>
  //   <ProductProvider>
  //     <BtnProvider>
  <App />,
  //     </BtnProvider>
  //   </ProductProvider>
  // </AuthProvider>,
);
