import React from 'react';
import './about.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { createApi } from 'unsplash-js';
import { Context } from '../../context/context';
import { useContext } from 'react';

function About() {
  const users = window.location.pathname.split('/')[2];
  const { user } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [User, setUser] = useState([]);
  const { search } = useLocation();

  //getting the users following and follow count
  const [Following, setFollowing] = useState('');
  const [Followers, setFollowers] = useState('');

  const count = (array) => {
    if (array.length === 0) return 0;
    else return array.length;
  };
  
 
  
  useEffect(() => {
    const FetchUsers = async () => {
      const res = await axios.get('/users?user=' + users);
      setUser(res.data[0]);
      setFollowing(count(user.following))
      setFollowers(count(user.followers))
      console.log(User);
    };
    FetchUsers();

    const fetchPosts = async () => {
      const res = await axios.get('/posts?user=' + users);
      setPosts(res.data);
    };
    fetchPosts();
  }, [User, search, user.followers, user.following, users]);

  //calling unsplash api for images
  const [image, setImage] = useState([]);
  useEffect(() => {
    const unsplash = createApi({
      accessKey: 'phSB4UX9ouCgPF7cNWvLcUzU9YIBC3AVhL3cfqTlHIY',
      // `fetch` options to be sent with every request
      headers: { 'X-Custom-Header': 'foo' },
    });
    const searchPhotos = async (e) => {
      unsplash.search
        .getPhotos({
          query: 'patterns',
          page: 1,
          perPage: 100,
          orientation: 'landscape',
        })
        .then((reponse) => {
          setImage(
            reponse.response.results[Math.floor(Math.random() * 10)].urls
              .regular
          );
        });
    };

    searchPhotos();
  }, []);

  const handleSub = async () => {
    const follow = {
      username: user._id,
      following: User._id,
    };

    await axios.patch(`/follow/`, follow);
  };

  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  id="overlay"
                  style={{ backgroundImage: `url(${image})`, height: 200 }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: 150 }}
                  >
                    <img
                      src={`https://res.cloudinary.com/dwtaoxehx/image/upload/${User.profilePic}.jpg`}
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: 150, zIndex: 1 }}
                    />
                    {User.username === user?.username && (
                      <a
                        type="button"
                        className="btn btn-outline-dark bg-white text-dark"
                        style={{ zIndex: 1 }}
                        href="/settings"
                      >
                        Edit profile
                      </a>
                    )}
                  </div>

                  <div
                    className="ms-3 d-flex align-items-center"
                    style={{ marginTop: 130 }}
                  >
                    <h5>{User.username}</h5>
                    <div className="container ">
                      {User.username !== user?.username && (
                        <button id="follow-button" onClick={handleSub}>
                          {user.following?.includes(User._id)
                            ? 'Unfollow'
                            : 'following'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">{posts.length}</p>
                      <p className="small text-muted mb-0">Posts</p>
                    </div>

                    <div className="px-3">
                      <p className="mb-1 h5">{0 || Followers}</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">{0 || Following }</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="font-italic mb-1">{User.about}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent Posts</p>
                    <p className="mb-0"></p>
                  </div>
                  <div className="row g-2 bg-light p-2 text-capitalize">
                    {posts.length <= 0 ? (
                      <h4>No Posts Yet Start Writing</h4>
                    ) : (
                      <>
                        {posts.map((i) => {
                          return (
                            <a
                              href={`/viewpage/${i._id}`}
                              key={i._id}
                              style={{ fontWeight: 600, paddingTop: '5px' }}
                              className="link"
                            >
                              {i.title}
                            </a>
                          );
                        })}
                      </>
                    )}
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
