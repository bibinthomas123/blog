import React from "react";
import { Card } from "react-bootstrap";
import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <Card style={{ width: 450, marginTop: 25 }} className="post">
      <Link className="link" to={`/viewpage/${post._id}`}>
        {post.photo && (
          <div className="image text-center">
            <Card.Img src={PF + post.photo} alt="the posts" height="350px" />
          </div>
        )}
        <Card.Body>
          <Card.Title className="title">{post.title}</Card.Title>
          <div className="postcats">
            {post.categories.map((index) => {
              <Card.Subtitle>{index.name}</Card.Subtitle>;
            })}
          </div>
          <Card.Subtitle>by {post.username}</Card.Subtitle>
          {/* <Card.Subtitle>{post.categories.name}</Card.Subtitle> */}
          <Card.Text className="my-3 subtext">{post.desc}</Card.Text>
          <Card.Footer className="text-center date">
            Edited on {new Date(post.createdAt).toDateString()}
          </Card.Footer>
        </Card.Body>
      </Link>
    </Card>
  );
}
