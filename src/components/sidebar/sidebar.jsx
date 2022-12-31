import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./Sidebar.css";

export default function Sidebar() {
  const [User, setUser] = useState([]);
  const [news, setNews] = useState([]);
  const { user } = useContext(Context);
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
        "https://newsdata.io/api/1/news?apikey=pub_150059d329411804c6cc11e5c44cc4c1495d9&country=in"
      )
        .then((res) => res.json())
        .then((data) => setNews(data.results));
    };
    NEWS();
  }, []);
  return (
    <div className="sidebar borders ">
      <div className=" conatiner sidebarItem">
        <span className="sidebarTitle py-4 px-2 my-2 h3">
          Trending around you
        </span>
        <ul className="sidebarList p-3 ">
          {news.slice(0, 5).map((e) => (
            <a href={`${e.link}`} target="_blank" rel="noreferrer" className="link">
              <li className="text m-0 py-2">{e.title}</li>
            </a>
          ))}
        </ul>
      </div>

      <div>
        <span className="sidebarTitle py-4 h4">Recommended to follow</span>
        <ul className="list-group list-group-flush pt-2">
          
          {/* removes the current user from the list and then displays the user list  */}
          {User.filter(item => item === user.username).slice(0,5).map((c) => (
              <>
                <Link to={`/about/${c.username}`} className="link">
                  <li className="list-group-item d-flex justify-content-between align-items-center bg-black text-white hover my-2 py-2">
                    <p>{c.username}</p>
                  <span className="badge badge-primary badge-pill"><img src={`https://res.cloudinary.com/dwtaoxehx/image/upload/${c.profilePic}.jpg`} height="35px" width="35px" className="rounded-circle"/></span>
                  </li> 
                </Link>
            
                <hr className="p-0 m-0" />
              </>
            ))}
        </ul>
      </div>
  
    </div>
  );
}
