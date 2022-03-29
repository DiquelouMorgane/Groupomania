import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({profileTab}) => {

  return (
    <header>
      <div className="main-header">
      <NavLink exact to="/">
        <img className="logo" src="./images/header_logo.png" alt="Logo Groupomania" />
      </NavLink>
      <div className="icons">
        <div className="iconsBis">
          <NavLink to='/' activeclassname="activeLeftNav">
            <img src="../images/icons/home.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/Post' activeclassname="activeLeftNav">
            <img src="../images/icons/news.svg" alt="Trends"/>
          </NavLink>
          <br/>
          <NavLink to='/Profil' activeclassname="activeLeftNav">
            <img src="../images/icons/user.svg" alt="Profil"/>
          </NavLink>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;