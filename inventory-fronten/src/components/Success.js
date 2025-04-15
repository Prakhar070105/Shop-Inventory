import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2 style={{ color: "green" }}>Payment Successful!</h2>
      <p>Your order has been placed and inventory updated.</p>
      <Link to="/" style={{ marginTop: "20px", display: "inline-block", color: "#007bff" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default Success;