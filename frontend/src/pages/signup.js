import { React, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Signup() {
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="login__form">
            <h1 className="text-center">Signup</h1>
            <Form.Group className="mb-3" controlId="formBasicFullname">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p>
                Already have a account ? <Link to="/login">Login </Link>
              </p>
            </div>
          </Form>
        </Col>

        <Col md={5} className="login_bg--container"></Col>
      </Row>
    </Container>
  );
}
