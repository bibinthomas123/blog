import React from "react";
import "./posts.css";
import Post from "../post/post";
import { Row, Col } from "react-bootstrap";

export default function Posts() {
  return (
    <div className="posts">
      <Row className="justify-content-md-center">
        <Col md="auto"><Post /></Col>
        <Col md="auto"><Post /></Col>
      </Row>
      
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Post />
        </Col>
        <Col md="auto">
          <Post />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Post />
        </Col>
        <Col md="auto">
          <Post />
        </Col>
      </Row>
    </div>
  );
}
