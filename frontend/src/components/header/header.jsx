import React from "react";
import "./header.css";
import { useState, useEffect } from "react";
import { createApi } from "unsplash-js";

function Header() {
  const [image, setImage] = useState();
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
          query: "nature",
          page: 1,
          perPage: 100,
          orientation: "landscape",
        })
        .then((reponse) => {
          setImage(
            reponse.response.results[Math.floor(Math.random() * 10)].urls.full
          );
        });
    };

    searchPhotos();
  }, []);
  return (
    <div className="container-fluid w-100">
      <div
        className="p-5 m-0 text-center bg-image"
        style={{
          backgroundImage: `url(${image})`,
          height: 620,
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
        }}
      >
         
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="myfont">
            <div className="text-white">
              <h1 className="mb-3 text-h1">The Blog</h1>
              <h4 className="mb-3">Write what your Soul says...</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
