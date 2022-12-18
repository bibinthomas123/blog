import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import "../../pages/single_page/singlepost.css";
//editor
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Editortoolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const ondescription = (value) => {
    setDesc(value)
  } 
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
      <div className="write my-4 min-vh-100 ">
        {file && (
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="cover"
              style={{ borderRadius: 20 }}
              className="singlePostImg px-2 my-5"
            />
          </div>
        )}

        <form
          action="post"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <section class="container">
            <div class="input-group">
              {/* add options here to select from the category list  */}
              <div>
                <input
                  class="form-control mb-2"
                  type="file"
                  id="formFile"
                  onBlur={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </section>
          <section class="container-fluid bg-gray">
            <div class="container mb-2  ">
              <div class="input-group input-group-lg parent ">
                <input
                  type="text"
                  className="  form-control "
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="Title"
                  onBlur={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>
          </section>
          <section class="container col-md-12">
          <div className="form-group col-md-12 editor">
            <EditorToolbar toolbarId={'t2'}/>
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={ondescription}
              placeholder={"Tell us your story..."}
              modules={modules('t2')}
              formats={formats}
            />
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
