import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
  return (
    <Navbar bg="transperant" variant="transperant" className="custom-navbar sticky-top">
      <Navbar.Brand>Fitness Logger</Navbar.Brand>
      <Nav className="ml-auto custom-nav-links">
        <Nav.Link href="/allexcercisepage">Add Exercise</Nav.Link>
        <Nav.Link href="/history">History</Nav.Link>
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
