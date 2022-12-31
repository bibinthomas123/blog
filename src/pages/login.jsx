import { React, useContext, useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Context } from "../context/context";

export default function Login() {
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      setError(false);
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
      });
      setError(true);
    }
  };
  // if (error) {
  //   var inputField = document.getElementById("shake");
  //   inputField.classList.add("bounce");
  //   setTimeout(function () {
  //     inputField.classList.remove("bounce");
  //   }, 1000);
  // }

  return (
    <Container className="bg-light mt-4 rounded shadow  border-box bg-white">
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="login__form" onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="text_h1">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                ref={userRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text_h1">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passRef}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
              disabled={isFetching}
            >
              Login
            </Button>
            <div className="py-4">
              <p>
                Don't have a account ? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
            <span>
              {error && (
                <>
                  <div
                    className="alert alert-danger position-absolute bounce"                   
                    role="alert"
                  >
                    Invalid credentials!
                  </div>
                </>
              )}
            </span>
          </Form>
        </Col>

        <Col md={6} className="login_bg--container--login "></Col>
      </Row>
    </Container>
  );
}
