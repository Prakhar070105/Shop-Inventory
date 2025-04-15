// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "fruits", label: "Fruits", image: "https://via.placeholder.com/300?text=Fruits" },
  { name: "vegetables", label: "Vegetables", image: "https://via.placeholder.com/300?text=Vegetables" },
  { name: "grains", label: "Grains", image: "https://via.placeholder.com/300?text=Grains" },
  { name: "other", label: "Other Groceries", image: "https://via.placeholder.com/300?text=Other+Groceries" },
];

const Home = () => {
  const Navigate = useNavigate();

  const goToCategory = (cat) => {
    // Navigate to the category page
    Navigate(`/category/${cat}`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", width: "100vw", height: "100vh" }}>
      {categories.map((cat) => (
        <div key={cat.name}
             onClick={() => goToCategory(cat.name)}
             style={{
               backgroundImage: `url(${cat.image})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               cursor: "pointer",
               border: "2px solid #ccc",
             }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.8)", textAlign: "center", padding: "10px" }}>
            {cat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;