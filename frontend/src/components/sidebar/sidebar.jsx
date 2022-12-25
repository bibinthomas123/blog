import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [user, setUser] = useState([]);
  const [news, setNews] = useState([]);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const setUsers = async () => {
      const res = await axios.get("/users/");
      setUser(res.data);
    };
    setUsers();
  }, []);

  useEffect(() => {
    const NEWS = async () => {
      fetch(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=80a8d445c9a84bf1bc07c10fff1ef333"
      )
        .then((res) => res.json())
        .then((data) => setNews(data.articles));
    };
    NEWS();
  }, []);
  return (
    <div className="sidebar borders ">
      <div className=" conatiner sidebarItem">
        <span className="sidebarTitle py-4  px-2 my-4">
          Trending around you
        </span>
        <ul className="sidebarList p-3 ">
          {news.slice(0, 5).map((e) => (
            <a href={`${e.url}`} target="_blank" className="link">
              <li className="text m-0 py-2">{e.title}</li>
            </a>
          ))}
        </ul>
      </div>

      <div>
        <span className="sidebarTitle py-4">Recommended to follow</span>
        <ul className="list-group list-group-flush pt-2">
          {user
            .sort((a, b) => b[1] - a[1])
            .map((c) => (
              <>
                <Link to={`/about/${c.username}`} className="link">
                  <li className="list-group-item d-flex justify-content-between align-items-center bg-black text-white hover my-2 py-2">
                    <p>{c.username}</p>
                  <span class="badge badge-primary badge-pill"><img src={PF+c.profilePic} height="35px" width="35px"className="rounded-circle"/></span>
                  </li> 
                </Link>
            
                <hr className="p-0 m-0" />
              </>
            ))}
        </ul>
      </div>
      <div className="container my-3">
        <div className="sidebarTitle mx-3">
          <h5>Community</h5>
        </div>
        <div className="items">
          <div className="row text-center my-3">
            <div className="col-4"><span className="btn btn-dark ">Programming</span></div>
            <div className="col-4"><span className="btn btn-dark ">Agriculture</span></div>
            <div className="col-4"><span className="btn btn-dark ">Technology</span></div>
          </div>
          <div className="row text-center ">
            <div className="col-4"><span className="btn btn-dark ">Civil</span></div>
            <div className="col-4"><span className="btn btn-dark ">Commerce </span></div>
            <div className="col-4"><span className="btn btn-dark ">Motivation</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
