import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainHome from "./components/MainHome";
import Category from "./components/Category";
import Cart from "./components/Cart";
import Success from "./components/Success";
import { CartProvider } from "./context/CartContext";
import LoginSuccess from "./components/LoginSuccess";
import RegisterAdmin from "./components/RegisterAdmin";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminBilling from "./components/AdminBilling";

// i18n
import { useTranslation } from "react-i18next";
 // Ensure i18n is initialized
function App() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <CartProvider>
      <Router>
        {/* Simple Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.leftNav}>
            <Link to="/" style={styles.link}>{t("Home")}</Link>
            <Link to="/cart" style={styles.link}>{t("Cart")}</Link>
          </div>
          <div style={styles.rightNav}>
            <select onChange={handleLanguageChange} style={styles.languageSelector}>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
            </select>
            <Link to="/admin/login" style={styles.adminLink}>
              {t("Admin Login")}
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin-billing" element={<AdminBilling />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#e8f5e9",
    borderBottom: "1px solid #ccc"
  },
  leftNav: {
    display: "flex",
    gap: "15px"
  },
  rightNav: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "#2e7d32",
    fontWeight: "bold"
  },
  adminLink: {
    textDecoration: "none",
    color: "#c62828",
    fontWeight: "bold"
  },
  languageSelector: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  }
};

export default App;