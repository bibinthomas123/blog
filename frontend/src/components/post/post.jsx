import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./post.css";
import { Link } from "react-router-dom";  
const readingTime =require("reading-time/lib/reading-time")

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const[time,setTime]=useState();

  useEffect(()=>{
    const stats = readingTime(post.desc)
    setTime(Math.round(stats.minutes))
  
   })
  return (
   
    <div className="container mb-3">
      <div className="card h-100 border-top  border-dark">
        <div className="row g-0">
          <div className="col-6 col-md-5">
            <img
              src={PF+post.photo}
              className="card-img img-fluid rounded-start h-100"
              alt="image/hmhmh"
              height={"450px"}
            />
          </div>
          <div className="col-6 col-md-7">
            <div className="card-body d-flex flex-column">
              <div className="h-100">
                <h5 className="card-title text-muted">{post.category}</h5>
                <h5 className="card-title title">
                  {post.title}
                </h5>
                <h6 className="card-subtitle mb-3">
                  by <span className="font-weight-bold">{post.username}</span>
                </h6>
                <p className="card-text mb-3 subtext" id="text"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}>
                
                </p>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-6">
                   <Link to={`/viewpage/${post._id}`}> <button type="button" class="btn btn-dark mx-2">Read more</button></Link>
                   <p className="m-2" id="time">{time} min read</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-muted">Edited on {new Date(post.createdAt).toDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  
  );
}
