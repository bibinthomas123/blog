import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/context';
import './Sidebar.css';

export default function Sidebar() {
  const [User, setUser] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    const setUsers = async () => {
      const res = await axios.get('/users/');
      setUser(res.data);
    };
    setUsers();
  }, []);

  return (
    <div className="sidebar  ">
      <div>
        <span className="sidebarTitle ">Recommended to follow</span>
        <ul className="list-group list-group-flush pt-3">
          {/* removes the current user from the list and then displays the user list  */}
          {User.filter((item) => item.username !== user.username)
            .slice(0, 5)
            .map((c, i) => (
              <>
                <Link to={`/about/${c.username}`} className="link" key={i}>
                  <li className="list-group-item d-flex justify-content-between align-items-center  my-2 py-2">
                    <p>{c.username}</p>
                    <span className="badge badge-primary badge-pill">
                      <img
                        src={`https://res.cloudinary.com/dwtaoxehx/image/upload/${c.profilePic}.jpg`}
                        height="35px"
                        width="35px"
                        className="rounded-circle"
                        alt=""
                      />
                    </span>
                  </li>
                </Link>

                {/* <hr className="p-0 m-0" /> */}
              </>
            ))}
        </ul>
      </div>
      <div className="container-fluid "></div>
      <div className="sidebar">
        <div className="conatiner">
          <div className="items d-flex justify-content-center">
            <div className="p-2">Help</div>
            <div className="p-2">Contribute</div>
            <div className="p-2">Privacy</div>
            <div className="p-2">Terms</div>
            <div className="p-2">API</div>
          </div>
          <span>©️2023 The Blog</span>
        </div>
      </div>
    </div>
  );
}
