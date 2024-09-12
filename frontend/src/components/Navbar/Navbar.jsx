import React, { useState } from 'react';
import {
  CDBNavbar,
  CDBNavBrand,
  CDBNavItem,
  CDBNavLink,
  CDBNavToggle,
  CDBIcon,
  CDBCollapse,
  CDBNavbarNav,
} from 'cdbreact';
import './navbar.css';

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <CDBNavbar className="navbarStyle" dark expand="md" scrolling>
      <CDBNavBrand href="/">
        <strong className="brandStyle">Cloud Sena</strong>
      </CDBNavBrand>
      <CDBNavbarNav className=" d-flex justify-content-end nav-items-container">
        <CDBNavItem >
          <CDBNavLink to="/login" className="navLinkStyle">
            <CDBIcon icon="user" className="me-2" />
            Login
          </CDBNavLink>
        </CDBNavItem>
        <CDBNavItem className="navItemStyle">
          <CDBNavLink to="/login/register" className="navLinkStyle">
            Sign Up
          </CDBNavLink>
        </CDBNavItem>
      </CDBNavbarNav>
    </CDBNavbar>
  );
};

export default Navbar;
