import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar bg="transperant" variant="transperant" className="custom-navbar sticky-top">
      <Navbar.Brand>Fitness Logger</Navbar.Brand>
      <Nav className="ml-auto custom-nav-links">
        <Link to="/allexcercisepage">Add Exercise</Link>
        <Link to="/history">History</Link>
        <Link to="/">Logout</Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
