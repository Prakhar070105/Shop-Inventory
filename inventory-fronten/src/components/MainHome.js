import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

function MainHome() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { t, i18n } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/category/fruits?search=${encodeURIComponent(searchText)}`);
    }
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const categories = [
    {
      name: t("fruits"),
      value: "fruits",
      image:
        "https://png.pngtree.com/png-clipart/20230217/original/pngtree-set-fruits-basket-isolated-on-white-background-png-image_8957743.png",
    },
    {
      name: t("vegetables"),
      value: "vegetables",
      image:
        "https://thumbs.dreamstime.com/b/wicker-basket-brimming-assorted-vegetables-including-cauliflower-cabbage-carrots-onions-tomatoes-green-peppers-broccoli-368585223.jpg",
    },
    {
      name: t("grains"),
      value: "grains",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSVmHQUiMi_nnyqLvC-A2gkp8Z-gXl06M-A&s",
    },
    {
      name: t("groceries"),
      value: "othergroceries",
      image:
        "https://www.shutterstock.com/image-illustration/bread-bag-packaging-sliced-inside-600nw-1657062628.jpg",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#28a745",
          padding: "15px 30px",
          color: "#fff",
        }}
      >
        {/* Centered logo & title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY_4KL0dD8PaFyXuJGW1_6iP5ztVutJG8_Og&s"
            alt="Logo"
            style={{ height: "60px", marginBottom: "5px" }}
          />
          <h1 style={{ margin: 0, fontSize: "30px" }}>{t("shop_name")}</h1>
        </div>

        {/* Right-aligned buttons */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "30px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <select onChange={handleLanguageChange} style={langSelect}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>

          <button onClick={() => navigate("/")} style={navBtn}>
            {t("home")}
          </button>
          <button onClick={() => navigate("/cart")} style={navBtn}>
            <FaShoppingCart style={{ marginRight: "5px" }} />
            {t("cart")}
          </button>
          <a href="http://localhost:5000/auth/google" style={googleBtn}>
            <FcGoogle style={{ marginRight: "5px" }} />
            {t("sign_in")}
          </a>
        </div>
      </div>

      {/* Address and Map */}
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p style={{ marginBottom: "5px" }}>
          76-77, Meta.h, Andhra University, Visakhapatnam, Andhra Pradesh.
          Pin code: 530003
        </p>
        <a
          href="https://www.google.com/maps?q=76-77,+Meta.h,+Andhra+University,+Visakhapatnam"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "6px",
            fontWeight: "bold",
            display: "inline-block",
            marginTop: "5px",
          }}
        >
          {t("view_on_google_maps")}
        </a>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{ textAlign: "center", margin: "30px 0" }}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t("search")}
          style={{
            width: "60%",
            maxWidth: "600px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </form>

      {/* Category Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          padding: "20px 40px",
        }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "10px",
              textAlign: "center",
              padding: "20px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            onClick={() => navigate(`/category/${cat.value}`)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const navBtn = {
  padding: "8px 14px",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#fff",
  color: "#28a745",
  cursor: "pointer",
};

const googleBtn = {
  padding: "8px 14px",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#fff",
  color: "#000",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: "bold",
};

const langSelect = {
  padding: "6px 10px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#fff",
  color: "#28a745",
  cursor: "pointer",
};

export default MainHome;