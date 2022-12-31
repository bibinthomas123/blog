import { React, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  //regex
  // const validEmail = new RegExp(    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");

  const handleSubmit = async (e) => {
    e.preventDefault(); //preventing refresh on submit
    setError(false);
    if (!validPassword.test(password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(true);
      setError(true);
      try {
        const res = await axios.post("/auth/signup", {
          username,
          email,
          password,
        });
        //
        res.data && window.location.replace("/login"); //once signed up redirect to the login page
      } catch (err) {
        setError(true);
      }
    }
  };

  return (
    <Container className="bg-light mt-4 rounded shadow bg-white">
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center  justify-content-center"
        >
          <Form className="login__form" onSubmit={handleSubmit}>
            <h1 className="text-center">Signup</h1>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br></br>

            {/* error */}
            {error && (
              <span style={{ color: "red", marginTop: "10px" }}>
                User already Exists !!
              </span>
            )}
            {passwordErr && (
              <span style={{ color: "red", marginTop: "10px" }}>
                please use a strong password !!
              </span>
            )}
            <br></br>
            <div className="py-4">
              <p>
                Already have a account ? <Link to="/login">Login </Link>
              </p>
            </div>
          </Form>
        </Col>

        <Col md={6} className="login_bg--container--signup"></Col>
      </Row>
    </Container>
  );
}
