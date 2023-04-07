import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Context } from "../../context/context.js";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import "./searchbar.css";

function Navbarexp() {
  const { user, dispatch } = useContext(Context);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [Posts, setPosts] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = Posts.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
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
      bg="light"
      sticky="top"
      variant="white"
      className="justify-content-center"
    >
      <Container>
        <Navbar.Brand href="/">
          <h4><strong>The Blog</strong></h4>
        </Navbar.Brand>

        {user ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto d-flex align-items-center justify-content-center">
                <form className="form-inline my-2 mx-lg-0">
                  <input
                    style={{ backgroundColor: "#ffff", color: "black" }}
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search...."
                    aria-label="Search"
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                  {filteredData.length !== 0 && (
                    <div className="dataResult text-white p-2 rounded">
                      {filteredData.slice(0, 15).map((value, key) => {
                        return (
                          <Link
                            to={"/viewpage/" + value._id}
                            key={key}
                            className="link"
                          >
                            <div>
                              {value.title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </form>

                <Nav.Link href="/">Articles</Nav.Link>

                <Nav.Link>
                  {" "}
                  <Link to={`/about/${user.username}`} className="nav_link">
                    Profile
                  </Link>
                </Nav.Link>
                <Nav.Link href="/addpost">Write</Nav.Link>

                <Nav.Link href="/settings">
                  <img
                    src={`https://res.cloudinary.com/dwtaoxehx/image/upload/${user.profilePic}.jpg`}
                    style={{ width: 40, height: 40 }}
                    className="rounded-circle"
                    alt="profile"
                  />
                </Nav.Link>
                {/*  */}
                <Nav.Link href="/login" onClick={handleLogout}>
                  Logout{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                </Nav.Link>
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
