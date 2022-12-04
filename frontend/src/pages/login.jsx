import { React,useContext,useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Context } from "../context/context";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit =async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try{
      const res =await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passRef.current.value

      })
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data

      });
    }catch(error){
      dispatch({
        type: "LOGIN_FAILURE",   

      });
    }
  };

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="login__form" onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                ref={userRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passRef}
              />
            </Form.Group>
            <Button className="button"variant="primary" type="submit" disabled={isFetching}>
              Login
            </Button>
            <div className="py-4">
              <p>
                Don't have a account ? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </Form>
        </Col>

        <Col md={5} className="login_bg--container"></Col>
      </Row>
    </Container>
  );
}
