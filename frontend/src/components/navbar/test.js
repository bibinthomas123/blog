import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/twitter.png";
import { Context } from "../../context/context.js";
import {useContext} from "react"


function Navbarexp() {
  const {user,dispatch} = useContext(Context)

  const handleLogout = ()=>{
    dispatch({
      type: "LOGOUT"
    })

    localStorage.clear();
    window.location.reload();

  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" sticky="top" variant="light"  className="justify-content-center">
      <Container >
      <Navbar.Brand href="/">
            <img
              src={logo}
              style={{ width: 32, marginRight: "13px" }}
              alt="wett"
            />
            The Blog
          </Navbar.Brand>
        {
          user ? (
            <> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/addpost">Write</Nav.Link>
            <Nav.Link href="/login"onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
          <Nav className="ms-auto" >
          <Nav.Link href="/settings" ><img src={user.profilePic} style={{ width: 40 ,height:40}} className="rounded-circle" alt="profile" /></Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className="d-flex align-items-center justify-content-center">
            <i className="text-wrap mx-2 fa-sharp fa-solid fa-magnifying-glass"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </>
          ):(
            <br></br>
          )
        }
      </Container>
    </Navbar>
  );
}

export default Navbarexp;