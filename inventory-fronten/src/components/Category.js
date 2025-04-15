import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Category() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart();
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [category]);

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ padding: "20px" }}>
      {/* Top Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ fontSize: "14px", padding: "6px", height: "34px", borderRadius: "6px" }}
        >
          <option value="">{t("sort")}</option>
          <option value="name">{t("name")}</option>
          <option value="low">{t("priceLowToHigh")}</option>
          <option value="high">{t("priceHighToLow")}</option>
        </select>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
            title={t("filterOptions")}
          >
            <FaFilter />
          </button>
          {filterOpen && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "30px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 5
            }}>
              <p>{t("filterComingSoon")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <input
          type="text"
          placeholder={t("searchFruits")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "90%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        justifyItems: "center"
      }}>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "14px",
              padding: "15px",
              maxWidth: "240px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9"
              }}
            />
            <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
            <p>₹{product.price} / {t("kg")}</p>
            <p style={{ marginBottom: "8px" }}>{t("inStock")}: {product.quantity} {t("kg")}</p>
            <div>
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={quantities[product._id] || 1}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                style={{
                  width: "60px",
                  padding: "5px",
                  marginRight: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={() => {
                  addToCart({ ...product, quantity: quantities[product._id] || 1 });
                  const btn = document.getElementById(`btn-${product._id}`);
                  if (btn) {
                    btn.innerText = t("added");
                    btn.style.background = "#17a2b8";
                    btn.style.transform = "scale(1.1)";
                    setTimeout(() => {
                      btn.innerText = t("addToCart");
                      btn.style.background = "#28a745";
                      btn.style.transform = "scale(1)";
                    }, 1500);
                  }
                }}
                id={`btn-${product._id}`}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                {t("addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "14px",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 10
        }}
        onClick={() => navigate("/cart")}
        title={t("viewCart")}
      >
        <FaShoppingCart size={20} />
        {cartItems.length > 0 && (
          <div style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            background: "red",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            color: "#fff"
          }}>
            {cartItems.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;