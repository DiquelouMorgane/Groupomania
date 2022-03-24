import React from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";

const Header = ({profileTab}) => {

  return (
    <header>
      <NavLink exact to="/">
        <img className="logo" src="../images/header_logo.png" alt="Logo Groupomania" />
      </NavLink>
    </header>
  );
};

export default Header;