import { useContext, useState,useRef,useEffect} from "react";
import { Context } from "../context/context";
import "./setting.css";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [value,setValue] = useState("")

  useEffect(() => {
    const fetchUser = async ()=>{
      const getUser = await axios.get("/users/"+user._id)
      setValue(getUser.data)
      
    }
    fetchUser()
   
  }, [])
  
  // setting the data into the new updatedUser
  const [file, setFile] = useState(null);
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [success, setSuccess] = useState(false);


  const aRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      email,
      password,
      about,
    };
    const api_key = "213974637119361";
    const cloud_name = "dwtaoxehx";

    if (file) {
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
      
      updatedUser.profilePic = cloudinaryResponse.data.public_id;
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  
  const removeImage = () => {
    aRef.current.value = null;
  };

  return (
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <h2 className="h3 mb-4 page-title">Settings</h2>
          <div className="my-4">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Profile
                </a>
              </li>
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="row  align-items-center">
                <div className="col-md-3 text-center mb-5">
                  <div className="avatar avatar-xl position-relative">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : `https://res.cloudinary.com/dwtaoxehx/image/upload/${user.profilePic}.jpg`
                      }
                      style={{
                        backgroundSize: "contain",
                        width: 250,
                        height: 250,
                      }}
                      alt="profic pic"
                      className="avatar-img rounded-circle p-4"
                    />

                    <div className="position-absolute end-0 translate-end bottom-0  ">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-dark dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Edit
                        </button>
                        <div className="dropdown-menu">
                          <label
                            className="dropdown-item "
                            htmlFor="file-field"
                          >
                            upload Image
                          </label>
                          <label className="dropdown-item" onClick={removeImage}>
                            Remove Image
                          </label>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="file-field"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                        ref={aRef} 
                      />
                      {/* to remove the file from the cloud */}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row p-5">
                    <div className="col-md-8">
                      <h6 className="">Username</h6>
                      <h4 className="mb-1 ">{user.username}</h4>
                      <p className="small mb-3">
                        {/* <span className="badge badge-dark">New York, USA</span> */}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* <div className="col-md-8">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                        {user.bio}
                      </p>
                    </div> */}
                    <div className="col">
                      <h4 className="m-4">About</h4>
                      <p className=" mb-0 text-muted m-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                        {user.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="form-row">
                <div className="form-group col-md-6">
                  {/* <label htmlFor="firstname">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    // placeholder={user.username}
                    value={value}
                    autoComplete="off"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  /> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstname">About Me</label>
                  <input
                    type="text"
                    id="about"
                    className="form-control"
                    placeholder="About me"
                    autoComplete="off"
                    value={value.about}
                    // required
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"                  
                  required
                  onblur={(e) => setEmail(e.target.value)}
                  value={value.email}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="inputAddress5">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress5"
                  placeholder="P.O. Box 464, 5975 Eget Avenue"
                />
              </div> */}

              <hr className="my-4" />
              <div className="row mb-4">
                <div className="col-md-6">
                  {/* <div className="form-group">
                    <h2>Change Password</h2>
                    <label htmlFor="inputPassword4">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                      
                    />
                  </div> */}
                  {/* <div className="form-group">
                    <label htmlFor="inputPassword5">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                    //   onChange={e=>userpassword(e.target.value)}
                    /> */}
                  {/* </div> */}
                  <div className="form-group">
                    <label htmlFor="inputPassword6">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword6"
                      required
                      placeholder="Confirm password"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Password requirements</p>
                  <p className="small text-muted mb-2">
                    To create a new password, you have to meet all of the
                    following requirements:
                  </p>
                  <ul className="small text-muted pl-4 mb-0">
                    <li>Minimum 8 character</li>
                    <li>At least one special character</li>
                    <li>At least one number</li>
                    <li>At least a Captial letter</li>
                  </ul>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Change
              </button>
              {success && (
                <div className="alert alert-success my-2" role="alert">
                  The Changes are Updated!!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
