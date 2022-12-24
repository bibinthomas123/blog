import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [news, setNews] = useState([]);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/users/");
      setCats(res.data);
      console.log("this is the users data",res.data)
    };
    getCats();
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
    <div className="sidebar borders">
      <div className=" conatiner sidebarItem">
        <span className="sidebarTitle py-4  px-2 my-4">
          {" "}
          Trending around you
        </span>
        <ul className="sidebarList ">
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
          {cats
            .sort((a, b) => b[1] - a[1])
            .map((c) => (
              <>
              <Link to={`/about/${c.username}`} className="link">
                <li class="list-group-item d-flex justify-content-between align-items-center bg-black text-white">
                  <p>{c.username}</p>
                  <span class="badge badge-primary badge-pill"><img src={PF+c.profilePic} height="35px" width="35px"className="rounded-circle"/></span>
                </li>
              </Link>
              <hr className="p-0 m-0"/>
             </>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
