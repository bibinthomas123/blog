import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import { useEffect,useState,useContext } from "react";
import {Context} from "../../context/context"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const {user} = useContext(Context)
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [updateMode,setUpdateMode] = useState(false)

  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res)
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getpost();
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
      setUpdateMode(false)
    } catch (err) {}
  };


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">

        {post.photo && (
          <img src={PF+post.photo} alt="" className="singlePostImg" />
        )}

        <h1 className="singlePostTitle">
          {post.title}
          {post.username===user?.username &&(
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
            </p>
      </div>
    </div>
  );
}
