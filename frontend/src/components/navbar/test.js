import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/twitter.png";
import { Context } from "../../context/context.js";
import { useContext } from "react";
import "./navbar.css";
function Navbarexp() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });

    localStorage.clear();
    window.location.reload();
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="black"
      sticky="top"
      variant="dark"
      className="justify-content-center"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            style={{ width: 32, marginRight: "13px" }}
            alt="wett"
          />
          The Blog
        </Navbar.Brand>
        {user ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">Profile</Nav.Link>
                <Nav.Link href="/addpost">Write</Nav.Link>
                <Nav.Link href="/login" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <form class="form-inline my-2 mx-lg-0">
                  <input style={{backgroundColor:"rgb(14,14,14)",color:"white"}}
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search...."
                    aria-label="Search"
                  />
                  {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>

                <Nav.Link href="/settings">
                  <img
                    src={PF + user.profilePic}
                    style={{ width: 40, height: 40 }}
                    className="rounded-circle"
                    alt="profile"
                  />
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  href="#memes"
                  className="d-flex align-items-center justify-content-center"
                ></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <br></br>
        )}
      </Container>
    </Navbar>
  );
}

export default Navbarexp;
