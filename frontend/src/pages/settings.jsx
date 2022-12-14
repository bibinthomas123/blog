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
        <div class="col-12 col-lg-10 col-xl-8 mx-auto">
          <h2 class="h3 mb-4 page-title">Settings</h2>
          <div class="my-4">
            <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
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
              <div class="row mt-5 align-items-center">
                <div class="col-md-3 text-center mb-5">
                  <div class="avatar avatar-xl position-relative">
                    <img
                      src={file ?URL.createObjectURL(file):PF+user.profilePic} style={{ backgroundSize:"contain",width:250,height:250}}
                      alt="profic pic"
                      class="avatar-img rounded-circle p-4"
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
                <div class="col">
                  <div class="row p-5">
                    <div class="col-md-8">
                      <h6 class="">Username</h6>
                      <h4 class="mb-1 ">{user.username}</h4>
                      <p class="small mb-3">
                        {/* <span class="badge badge-dark">New York, USA</span> */}
                      </p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    {/* <div class="col-md-8">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                        {user.bio}
                      </p>
                    </div> */}
                    <div class="col">
                      <p>About</p>
                      <p class="small mb-0 text-muted">
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien. */}
                        {user.about}
                      </p>
                      {/* <p class="small mb-0 text-muted">(537) 315-1481</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="firstname">Username</label>
                  <input
                    type="text"
                    id="username"
                    class="form-control"  
                    placeholder={user.username}
                    autocomplete="off"
                    required
                    onChange={e=>setUsername(e.target.value)}
                  />
                </div>
                
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="firstname">About Me</label>
                  <input
                    type="text"
                    id="about"
                    class="form-control"  
                    placeholder="About me"
                    autocomplete="off"
                    // required
                    onChange={e=>setAbout(e.target.value)}
                  />
                </div>
                
              </div>
              <div class="form-group">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder={user.email}
                  autocomplete="off"
                  required
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              {/* <div class="form-group">
                <label for="inputAddress5">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress5"
                  placeholder="P.O. Box 464, 5975 Eget Avenue"
                />
              </div> */}

              <hr class="my-4" />
              <div class="row mb-4">
                <div class="col-md-6">
                  {/* <div class="form-group">
                    <h2>Change Password</h2>
                    <label for="inputPassword4">Old Password</label>
                    <input
                      type="password"
                      class="form-control"
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
                    <label for="inputPassword6">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword6"
                      required
                      placeholder="Confirm password"
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
                    <li>Can???t be the same as a previous password</li>
                  </ul>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Change
              </button>
              {success && <div class="alert alert-success my-2" role="alert">
  The Changes are Updated!!
</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

