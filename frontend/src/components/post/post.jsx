import React from "react";
import { Card } from "react-bootstrap";
import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <Card style={{ width: 450, marginTop: 25 }}>
      {post.photo && (
        <div className="image text-center">
          <Card.Img
            src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="the posts"
          />
        </div>
      )}
      <Link className="link" to={`/viewpage/${post._id}`}>
        <Card.Body>
          <Card.Title className="title">{post.title}</Card.Title>
          <div className="postcats">
            {post.categories.map((e) => {
              <Card.Subtitle> bibin</Card.Subtitle>;
            })}
          </div>
          <Card.Subtitle>by {post.username}</Card.Subtitle>
          <Card.Text className="my-3 subtext">{post.desc}</Card.Text>
          <Card.Footer className="text-center date">
            Edited on {new Date(post.createdAt).toDateString()}
          </Card.Footer>
        </Card.Body>
      </Link>
    </Card>
  );
}
