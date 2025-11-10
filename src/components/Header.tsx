import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./Header.css";

const Header: React.FC = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h1>Coffee Bot</h1>
        </Link>
        <p>Добро пожаловать в нашу кофейню!</p>
        <Link to="/cart" className="cart-link">
          Корзина
          {getTotalItems() > 0 && (
            <span className="cart-badge">{getTotalItems()}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
