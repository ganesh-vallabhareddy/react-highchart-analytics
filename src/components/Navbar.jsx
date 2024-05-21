import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Meridian Hiring Dashboard</div>
      <div className="navbar-items">
        <NavLink
          to="/hiring-data-bar"
          className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}
        >
          Hiring Data (Bar)
        </NavLink>
        <NavLink
          to="/quarterly-data"
          className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}
        >
          Quarterly Data
        </NavLink>
        <NavLink
          to="/half-yearly-data"
          className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}
        >
          Half-Yearly Data
        </NavLink>
        <NavLink
          to="/annually-data"
          className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}
        >
          Annual Data
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
