import React from "react";
import "./about.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import { createApi } from "unsplash-js";

function About() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const PF = "http://localhost:5000/images/";
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts?user="+user.username);
      setPosts(res.data);
      console.log(res.data);
      // console.log(posts[0]._id)
    };
    fetchPosts();
  }, [search]);

  //calling unsplash api for images

  const [image, setImage] = useState([]);
  useEffect(() => {
    const unsplash = createApi({
      accessKey: "phSB4UX9ouCgPF7cNWvLcUzU9YIBC3AVhL3cfqTlHIY",
      // `fetch` options to be sent with every request
      headers: { "X-Custom-Header": "foo" },
    });
    const searchPhotos = async (e) => {
      // e.preventDefault();
      unsplash.search
        .getPhotos({
          query: "patterns",
          page: 1,
          perPage: 100,
          orientation: "landscape",
        })
        .then((reponse) => {
          setImage(reponse.response.results[Math.floor(Math.random() * 10)].urls.regular);
        });
    };
    console.log(image)

    searchPhotos();
  }, []);
  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                   style={{ backgroundImage: `url(${image})` , height: 200 }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: 150 }}
                  >
                    <img
                      src={PF + user.profilePic}
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: 150, zIndex: 1 }}
                    />
                    <a
                      type="button"
                      className="btn btn-outline-dark"
                      style={{ zIndex: 1 }}
                      href="/settings"
                    >
                      Edit profile
                    </a>
                  </div>
                  <div className="ms-3" style={{ marginTop: 130 }}>
                    <h5>{user.username}</h5>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                   <Link className="link" to={`/?user=${user.username}`}>
                   <div>
                      <p className="mb-1 h5">{posts.length}</p>
                      <p className="small text-muted mb-0">Posts</p>
                    </div>
                   </Link>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">{user.about}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent Posts</p>
                    <p className="mb-0">
                      <Link to={`/?user=${user.username}`} className="text-muted">
                        Show all
                      </Link>
                    </p>
                  </div>
                  <div className="row g-2 bg-light p-2 text-capitalize">
                    {posts.map((i) => {
                      return(                        
                        <a href={`/viewpage/${i._id}`} style={{fontWeight:600,paddingTop:"5px"}} className="link">{i.title}</a>
                        )
                      })}
                    
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
