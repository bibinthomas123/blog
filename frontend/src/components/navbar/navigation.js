import React from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../images/twitter.png";
import "../components/navbar.css"
function navigation() {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              style={{ width: 32, marginRight: "13px" }}
              alt="wett"
            />
            The Blog
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn btn-primary text-white">Login</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navigation;
