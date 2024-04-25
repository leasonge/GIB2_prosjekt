import { FaSkiing } from "react-icons/fa";
import React from "react";
import "./headerstyles.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="container">
      <nav className="nav">
        <Link to="/" className="logo" style={{ fontSize: "40px" }}>
          <FaSkiing className="logo-icon" />
          <span className="logo-text"> Veien til sporet</span>
        </Link>
        <ul>
          <li>
            <Link to="/reiseplanlegger">Reiseplanlegger</Link>
          </li>
          <li>
            <Link to="/favoritter">Favoritter</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
