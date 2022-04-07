import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="nav">
        <div className="nav-logo">
          <NavLink exact to="/" className="nav-logo-link">
            <img
              src={"../images/icon-left-font-monochrome-white.svg"}
              alt="logo"
              className="nav-logo-link-img"
            />
            <h1 className="nav-logo-link-community"> vous souhaite la bienvenue !</h1>
          </NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink exact to="/post">
              <img
                src={"../images/icons/news.png"}
                alt="News"
                className="nav-links-img button"
              />
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink exact to="/profil">
              <img
                src={"../images/icons/profil.png"}
                alt="profil"
                className="nav-links-img button"
              />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/">
              <img
                src={"../images/icons/logout.png"}
                alt="Déconnexion"
                className="nav-links-img button"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Nav;