import React from "react";
import "./Nav.css";
import ListAltIcon from "@material-ui/icons/ListAlt";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar">
      <span className="navbar__brand">Grocery Store Management System</span>
      <div className="navbar__icons">
        <Link to="/">
          <IconButton className="home__icon">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>

        <Link to="/orders">
          <IconButton className="order__icon">
            <ListAltIcon fontSize="large" />
          </IconButton>
        </Link>

        <Link to="/products">
          <IconButton className="product__icon">
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
