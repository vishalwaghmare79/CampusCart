import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishListProvider } from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishListProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </WishListProvider>
  </AuthProvider>
);
