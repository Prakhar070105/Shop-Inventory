// components/Cart.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!upiId.trim()) {
      alert("Please enter a valid UPI ID.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            quantityToBuy: item.quantity,
          })),
          upiId: upiId.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        navigate("/success");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
              <div style={{ marginLeft: "20px", flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price} / kg</p>
                <p>Quantity: {item.quantity} kg</p>
                <p style={{ fontWeight: "bold" }}>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "right", marginRight: "20px" }}>Total: ₹{totalAmount}</h3>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{
                padding: "10px",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <button
              onClick={handleCheckout}
              disabled={!upiId.trim()}
              style={{
                padding: "10px 20px",
                backgroundColor: upiId.trim() ? "#28a745" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: upiId.trim() ? "pointer" : "not-allowed",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;