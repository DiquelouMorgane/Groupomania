import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="leftNavContainer">
      <div className="icons">
        <div className="iconsBis">
          <NavLink to='/' activeclassname="activeLeftNav">
            <img src="../images/icons/home.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/Post' activeclassname="activeLeftNav">
            <img src="../images/icons/news.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/Profil' activeclassname="activeLeftNav">
            <img src="../images/icons/user.svg" alt="home"/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;