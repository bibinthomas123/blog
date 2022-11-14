import React from "react";
import { Card } from "react-bootstrap";
import "./post.css" 

export default function Posts() {
  return (
    <Card style={{ width: 450,marginTop:25 }}>
      <div className="image">
        <Card.Img 
          src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="the posts"
        />
      </div>
      <Card.Body>
        <Card.Title className="title">
          the data is the best way of wbeing what im right now  and there 
        </Card.Title>
        <Card.Subtitle>by Author</Card.Subtitle>
        <Card.Text className="my-3 subtext">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Footer className="text-center date">2 days ago</Card.Footer>
      </Card.Body>
    </Card>
  );
}
