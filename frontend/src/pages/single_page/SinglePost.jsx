import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./singlepost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [profile, setProfile] = useState([]);
  const { search } = useLocation();

  // console.log(user)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts?user=" + post.username);
      setProfile(res.data);
      // console.log()
      console.log(res.data);
      console.log(profile);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost px-5">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor   position-relative ">
            Author:
            <Link to={`/?user=${post.username}`} className="link active">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
         { //Profile card section 
          post.username != user?.username &&(
            <section>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-md-9 col-lg-7 col-xl-5">
                  <div className="card" style={{ borderRadius: 15 }}>
                    <div className="card-body p-4">
                      <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                          <img
                            src={PF + user.profilePic}
                            alt="Generic placeholder image"
                            className="img-fluid"
                            style={{ width: 180, borderRadius: 10 }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="mb-1">{post.username}</h5>
                          <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                            Senior Journalist
                          </p>
                          <div
                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                            style={{ backgroundColor: "#efefef" }}
                          >
                            <div>
                              <p className="small text-muted mb-1">Posts</p>
                              <p className="mb-0">{profile.length}</p>
                            </div>
                            <div className="px-3">
                              <p className="small text-muted mb-1">Followers</p>
                              <p className="mb-0">976</p>
                            </div>
                            <div>
                              <p className="small text-muted mb-1">Rating</p>
                              <p className="mb-0">8.5</p>
                            </div>
                          </div>
                          <div className="d-flex pt-1">
                            <button
                              type="button"
                              className="btn btn-primary flex-grow-1"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )
         }
    </div>
  );
}
