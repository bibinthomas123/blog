import React from "react";
import "./posts.css";
import Post from "../post/post";
// import { Row, Col } from "react-bootstrap";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        // <Row className="justify-content-md-center">
        //   <Col md="auto">
        //     <Post post={p} />
        //   </Col>
        // </Row>
        <Post post={p} />
      ))}
    </div>
  );
}
