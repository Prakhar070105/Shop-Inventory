import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("fruits");
  const [successMsg, setSuccessMsg] = useState("");
  const [billingMsg, setBillingMsg] = useState("");

  // Billing states
  const [selectedProductId, setSelectedProductId] = useState("");
  const [soldQuantity, setSoldQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/category/${category}`);
      const updatedProducts = res.data.map((item) => ({
        ...item,
        newPrice: item.price,
        newQuantity: item.quantity,
      }));
      setProducts(updatedProducts);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleUpdate = async (id, newPrice, newQuantity) => {
    try {
      await axios.put(`http://localhost:8000/api/products/update/${id}`, {
        price: newPrice,
        stock: newQuantity,
      });
      setSuccessMsg("Product updated!");
      setTimeout(() => setSuccessMsg(""), 2000);
      fetchProducts();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleBilling = async () => {
    if (!selectedProductId || !soldQuantity) {
      setBillingMsg("Please select a product and enter quantity.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/billing/sell", {
        productId: selectedProductId,
        quantitySold: soldQuantity,
      });
      setBillingMsg("Billing successful. Stock updated.");
      setTimeout(() => setBillingMsg(""), 2000);
      setSelectedProductId("");
      setSoldQuantity("");
      fetchProducts();
    } catch (err) {
      setBillingMsg("Billing failed. Check stock or try again.");
      console.error("Billing error", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Inventory Dashboard</h2>

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="grains">Grains</option>
        <option value="groceries">Other Groceries</option>
      </select>

      {successMsg && <p style={styles.success}>{successMsg}</p>}

      {/* Billing Section */}
      <div style={styles.billingBox}>
        <h3 style={{ marginBottom: "10px" }}>Billing Section</h3>

        <label style={styles.label}>Select Product:</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Select --</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} (Available: {p.quantity} kg)
            </option>
          ))}
        </select>

        <label style={styles.label}>Quantity Sold (kg):</label>
        <input
          type="number"
          value={soldQuantity}
          onChange={(e) => setSoldQuantity(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleBilling} style={{ ...styles.button, marginTop: "10px" }}>
          Submit Billing
        </button>

        {billingMsg && <p style={styles.success}>{billingMsg}</p>}
      </div>

      {/* Product Update Grid */}
      <div style={styles.grid}>
        {products.map((product, index) => (
          <div key={product._id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h4 style={styles.name}>{product.name}</h4>
            <p style={styles.text}>Current Price: ₹{product.price}</p>
            <p style={styles.text}>Current Stock: {product.quantity} kg</p>

            <label style={styles.label}>Update Price (₹):</label>
            <input
              type="number"
              value={product.newPrice}
              onChange={(e) => handleInputChange(index, "newPrice", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Update Quantity (kg):</label>
            <input
              type="number"
              value={product.newQuantity}
              onChange={(e) => handleInputChange(index, "newQuantity", e.target.value)}
              style={styles.input}
            />

            <button
              onClick={() => handleUpdate(product._id, product.newPrice, product.newQuantity)}
              style={styles.button}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    color: "#2c3e50",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "30px",
  },
  billingBox: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "40px",
    backgroundColor: "#f9f9f9",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  text: {
    margin: "4px 0",
    fontSize: "14px",
    color: "#555",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "8px",
    margin: "6px 0",
    width: "100%",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default AdminDashboard;