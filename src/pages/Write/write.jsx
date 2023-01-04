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
    setDesc(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const api_key = "213974637119361";
    const cloud_name = "dwtaoxehx";

    if (file) {
      // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
      const signatureResponse = await axios.get("/get-signature");

      const data = new FormData();
      data.append("file", document.querySelector("#file-field").files[0]);
      data.append("api_key", api_key);
      data.append("signature", signatureResponse.data.signature);
      data.append("timestamp", signatureResponse.data.timestamp);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            
          },
        }
      );
      

      // send the image info back to our server
      // const photoData = {
      //   public_id: cloudinaryResponse.data.public_id,
      //   version: cloudinaryResponse.data.version,
      //   signature: cloudinaryResponse.data.signature,
      // };

      // axios.post("/do-something-with-photo", photoData);
      try {
        const newPost = {
          username: user.username,
          title,
          desc,
          image: cloudinaryResponse.data.public_id,
        };
        const res = await axios.post("/posts", newPost);
        // window.location.replace("/viewpage/" + res.data._id);
      } catch (err) {}
    }
    else{
      try{
        const newPostWithoutFile = {
          username: user.username,
            title,
            desc,
        }
        const res = await axios.post("/posts", newPostWithoutFile);
        window.location.replace("/viewpage/" + res.data._id);
      }catch (err) {}
    }
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
          encType="multipart/form-data"
          id="upload-form"
        >
          <section className="container">
            <div className="input-group">
              {/* add options here to select from the category list  */}
              <div>
                <input
                  className="form-control mb-2"
                  type="file"
                  id="file-field"
                  onBlur={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </section>
          <section className="container-fluid bg-gray">
            <div className="container mb-2  ">
              <div className="input-group input-group-lg parent ">
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
          <section className="container col-md-12">
            <div className="form-group col-md-12 editor">
              <EditorToolbar toolbarId={"t2"} />
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={ondescription}
                placeholder={"Tell us your story..."}
                modules={modules("t2")}
                formats={formats}
              />
            </div>
            <button type="submit" className="btn btn-primary my-3 ">
              Submit
            </button>
          </section>
        </form>
      </div>
    </>
  );
}
