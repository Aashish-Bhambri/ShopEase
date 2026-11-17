import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import AdminHomePage from "./pages/AdminHomePage";
import AdminSidebar from "./components/AdminSidebar";
import AdminDashboard from "./components/AdminDashboard";
import AdminProducts from "./components/AdminProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/login" element={<AdminHomePage />} />

        <Route element={<AdminSidebar />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
