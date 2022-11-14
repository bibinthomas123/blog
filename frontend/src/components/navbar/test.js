import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/twitter.png";
import profileimage from "../../images/profile.jpg";


function Navbarexp() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" sticky="top" variant="light"  className="justify-content-center">
      <Container >
      <Navbar.Brand>
            <img
              src={logo}
              style={{ width: 32, marginRight: "13px" }}
              alt="wett"
            />
            The Blog
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
            <Nav.Link href="#">Write</Nav.Link>
            <Nav.Link href="/login">Logout</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link><img src={profileimage} style={{ width: 40 ,height:40}} className="rounded-circle" alt="profile" /></Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className="d-flex align-items-center justify-content-center">
            <i className="text-wrap mx-2 fa-sharp fa-solid fa-magnifying-glass"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarexp;