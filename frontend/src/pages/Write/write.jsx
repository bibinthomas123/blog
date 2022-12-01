import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import "../../pages/single_page/singlepost.css"
// import "./write.css";
// import Image from "react-bootstrap/Image"

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/viewpage/" + res.data._id);
    } catch (err) {}
  };
  return (
    <>
      <div className="write">
        {file && (
       <div >
       <img src={URL.createObjectURL(file)} alt="" style={{borderRadius:20}} className="singlePostImg px-2 my-5" />
      </div>
      )}
        
        <form action="post" onSubmit={handleSubmit} enctype= 'multipart/form-data'>
          <section class="container">
            <div class="input-group">
              {/* add options here to select from the category list  */}
              <div>
                <input
                  class="form-control mb-2"
                  type="file"
                  id="formFile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </section>
          <section class="container-fluid bg-gray">
            <div class="container mb-2  ">
              <div class="input-group input-group-lg parent ">
                <input
                  type="text"
                  className="  form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                ></input>
              </div>
            </div>
          </section>
          <section class="container">
            <div class="input-group">
              <textarea
                class="form-control textwrite"
                rows="50"
                type="textarea"
                placeholder="Tell us your story.. :)"
                onChange={e => setDesc(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary my-3 ">
              Submit
            </button>
          </section>
        </form>
      </div>
    </>
  );
}
