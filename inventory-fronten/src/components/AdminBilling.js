import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const AdminBilling = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBilling = () => {
    if (!selectedProduct || !quantity) {
      setMessage("Please select a product and quantity.");
      return;
    }

    axios.post("http://localhost:8000/api/billing/bill", {
      productId: selectedProduct.value,
      quantity
    })
      .then(res => {
        setMessage(res.data.message);
        setQuantity(1);
        setSelectedProduct(null);
        // Refresh products to show updated stock
        axios.get("http://localhost:8000/api/products")
          .then(res => setProducts(res.data));
      })
      .catch(err => {
        setMessage(err.response?.data?.message || "Billing failed");
      });
  };

  const options = products.map(prod => ({
    value: prod._id,
    label: `${prod.name} (In stock: ${prod.quantity})`
  }));

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Billing Page</h2>
      {message && <p style={styles.message}>{message}</p>}

      <Select
        options={options}
        value={selectedProduct}
        onChange={setSelectedProduct}
        placeholder="Search and select product..."
        styles={selectStyles}
      />

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
        style={styles.input}
      />

      <button onClick={handleBilling} style={styles.button}>Bill</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  message: {
    color: "green",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    marginBottom: "10px",
    fontSize: "16px",
  }),
};

export default AdminBilling;