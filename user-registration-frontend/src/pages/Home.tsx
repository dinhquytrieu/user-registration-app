// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to the User Registration System</h1>
      <p>Please log in or register to access your account.</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/login" style={{ marginRight: "1rem" }}>
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
