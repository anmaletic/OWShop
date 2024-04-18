import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <CartProvider>
      <>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <NavBar />
            <div className="page">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
              <div className="flex-shrink-0 w-100">
                <Footer />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </>
    </CartProvider>
  );
};

export default App;
