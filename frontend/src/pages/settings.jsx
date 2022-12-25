import { useContext, useState } from "react";
import { Context } from "../context/context";
import "./setting.css";
import axios from "axios";


export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      about
      
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };




  return (
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div  className="col-12 col-lg-10 col-xl-8 mx-auto">
          <h2  className="h3 mb-4 page-title">Settings</h2>
          <div  className="my-4">
            <ul  className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li  className="nav-item">
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
              <div  className="row mt-5 align-items-center">
                <div  className="col-md-3 text-center mb-5">
                  <div  className="avatar avatar-xl position-relative">
                    <img
                      src={file ?URL.createObjectURL(file):PF+user.profilePic} style={{ backgroundSize:"contain",width:250,height:250}}
                      alt="profic pic"
                       className="avatar-img rounded-circle p-4"
                    />
          
                    <div className="position-absolute bottom-0 end-0 translate-middle  ">
                      <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-duotone border bg-black text-light rounded-circle pointer ml-2 p-2 fa-user"></i>
                        
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div  className="col">
                  <div  className="row p-5">
                    <div  className="col-md-8">
                      <h6  className="">Username</h6>
                      <h4  className="mb-1 ">{user.username}</h4>
                      <p  className="small mb-3">
                        {/* <span  className="badge badge-dark">New York, USA</span> */}
                      </p>
                    </div>
                  </div>
                  <div  className="row mb-4">
                    {/* <div  className="col-md-8">
                      <p  className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                        {user.bio}
                      </p>
                    </div> */}
                    <div  className="col">
                      <p>About</p>
                      <p  className="small mb-0 text-muted">
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien. */}
                        {user.about}
                      </p>
                      {/* <p  className="small mb-0 text-muted">(537) 315-1481</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <hr  className="my-4" />
              <div  className="form-row">
                <div  className="form-group col-md-6">
                  <label htmlFor="firstname">Username</label>
                  <input
                    type="text"
                    id="username"
                     className="form-control"  
                    placeholder={user.username}
                     autoComplete="off"
                    required
                    onChange={e=>setUsername(e.target.value)}
                  />
                </div>
                
              </div>
              <div  className="form-row">
                <div  className="form-group col-md-6">
                  <label htmlFor="firstname">About Me</label>
                  <input
                    type="text"
                    id="about"
                     className="form-control"  
                    placeholder="About me"
                     autoComplete="off"
                    // required
                    onChange={e=>setAbout(e.target.value)}
                  />
                </div>
                
              </div>
              <div  className="form-group">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                   className="form-control"
                  id="inputEmail4"
                  placeholder={user.email}
                   autoComplete="off"
                  required
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              {/* <div  className="form-group">
                <label for="inputAddress5">Address</label>
                <input
                  type="text"
                   className="form-control"
                  id="inputAddress5"
                  placeholder="P.O. Box 464, 5975 Eget Avenue"
                />
              </div> */}

              <hr  className="my-4" />
              <div  className="row mb-4">
                <div  className="col-md-6">
                  {/* <div  className="form-group">
                    <h2>Change Password</h2>
                    <label for="inputPassword4">Old Password</label>
                    <input
                      type="password"
                       className="form-control"
                      id="inputPassword5"
                      
                    />
                  </div> */}
                  {/* <div className="form-group">
                    <label for="inputPassword5">New Password</label>
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
                      pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$"
                      
                    //   onChange={e=>userpassword2(e.target.value)}
                    onChange={e=>setPassword(e.target.value)}
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
                    <li>Can’t be the same as a previous password</li>
                  </ul>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Change
              </button>
              {success && <div  className="alert alert-success my-2" role="alert">
  The Changes are Updated!!
</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

