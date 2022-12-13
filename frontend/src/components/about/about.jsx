import React from "react";
import "./about.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

function About() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const PF = "http://localhost:5000/images/";
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts?user=ADMIN");
      setPosts(res.data);
      console.log(res.data);
      
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <div className="row py-5 px-4 body">
        {" "}
        <div className="col-md-5 mx-auto">
          {" "}
          {/* Profile widget */}
          <div className="bg-white shadow rounded overflow-hidden">
            {" "}
            <div className="px-4 pt-0 pb-4 cover">
              {" "}
              <div className="media align-items-end profile-head">
                {" "}
                <div className="profile mr-3">
                  <img
                    src={PF + user.profilePic}
                    style={{
                      backgroundSize: "contain",
                      width: 200,
                      height: 200,
                    }}
                    alt="..."
                    width={130}
                    className="rounded mb-2 img-thumbnail"
                  />
                  <a
                    href="/settings"
                    className="btn btn-outline-dark text-white btn-sm btn-block"
                  >
                    Edit profile
                  </a>
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">{user.username}</h4>{" "}
                  <p className="small mb-4">
                    <i className="fas mr-2" />
                    {/* New York */}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item pr-2">
                  <Link to={`/?user=${user.username}`} className="link">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {posts.length}
                  </h5>
                  <small className="text-muted">
                    {/* <i className="fas fa-image mr-1" /> */}
                    Posts
                  </small>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">745</h5>
                  <small className="text-muted">
                    {/* <i className="fas fa-user mr-1" /> */}
                    Followers
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">340</h5>
                  <small className="text-muted">
                    {/* <i className="fas fa-user mr-1" /> */}
                    Following
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>{" "}
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-0">{user.about}</p>{" "}
                {/* <p className="font-italic mb-0">Lives in New York</p>{" "}
                <p className="font-italic mb-0">Photographer</p>{" "} */}
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
               
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
