import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
import "./post.css";
import { Link } from "react-router-dom";  
const readingTime =require("reading-time/lib/reading-time")

export default function Post({ post }) {
  const[time,setTime]=useState();
  const[image,setImage]=useState(true);

  useEffect(()=>{
    const stats = readingTime(post.desc)
    setTime(Math.round(stats.minutes))

    //checking if the image is present or not 
    if(post.image){
      setImage(true)
    }
    else{
      setImage(false)
    }
  },[setTime])
  return (
   <>
   {image ? (
    
    <div className="container mb-3">
      <div className="card h-100 border-top  border-dark">
        <div className="row g-0">
          <div className="col-sm-5 d-flex align-items-center p-3">
            <img
              src={ `https://res.cloudinary.com/dwtaoxehx/image/upload/c_fill,w_400,h_400,g_north/${post.image}.jpg`}
              className="card-img img-fluid rounded-start min-height"
              alt="image/post image"
            />
          </div>
          <div className="col-sm-7">
            <div className="card-body d-flex flex-column">
              <div className="h-100">
                <h5 className="card-title text-muted">{post.category}</h5>
                <h5 className="card-title title">
                  {post.title}
                </h5>
                <h6 className="card-subtitle mb-3">
                  by <span className="font-weight-bold">{post.username}</span>
                </h6>
                <p className="card-text mb-3 subtext" id="text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}>
                
                </p>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-6">
                   <Link to={`/viewpage/${post._id}`}> <button type="button" className="btn btn-dark mx-2">Read more</button></Link>
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
   ):(
    
    <div className="container mb-3">
      <div className="card h-100 border-top  border-dark">
        <div className="row g-0">
          <div className="col-12">
            <div className="card-body d-flex flex-column">
              <div className="h-100">
                <h5 className="card-title text-muted">{post.category}</h5>
                <h5 className="card-title title">
                  {post.title}
                </h5>
                <h6 className="card-subtitle mb-3">
                  by <span className="font-weight-bold">{post.username}</span>
                </h6>
                <p className="card-text mb-3 subtext" id="text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}>
                
                </p>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-6">
                   <Link to={`/viewpage/${post._id}`}> <button type="button" className="btn btn-dark mx-2">Read more</button></Link>
                   <p className="m-2" id="time">{time} min read</p>
                    <p className="text-muted">Edited on {new Date(post.createdAt).toDateString()}</p>
                  </div>
                  <div className="col-md-6">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
   )
  
  }
   
   
   
   </>
  
  );
}
