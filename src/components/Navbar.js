import React from "react";
import { Link } from "react-router-dom";

const traits = ["color", "bg", "spikes", "philBody", "teeth", "topJaw", "eyes", "top", "neck"];

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>
      {traits.map((trait) => (
        <Link
          key={trait}
          to={`/${trait}`}
          style={{
            color: "white",
            textDecoration: "none",
            marginLeft: "15px",
          }}
        >
          {trait.charAt(0).toUpperCase() + trait.slice(1)}
        </Link>
      ))}
      <Link
        to="/final"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "15px",
        }}
      >
        Finalize & Mint
      </Link>
    </nav>
  );
};

export default Navbar;