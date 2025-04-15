import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include", // Important to include cookies
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Not logged in");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error(err);
        navigate("/"); // Redirect to home if not logged in
      });
  }, [navigate]);

  const handleLogout = () => {
    fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => navigate("/"))
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Welcome!</h2>
      {user ? (
        <>
          <img
            src={user.photos[0].value}
            alt="Profile"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <h3>{user.displayName}</h3>
          <p>{user.emails[0].value}</p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default LoginSuccess;