import Home from "./pages/home.jsx"
import Signup from "./pages/signup.jsx";
import Write from "./pages/Write/write";
import Login from  "./pages/login"
import Footer from "./components/footer/footer"
import {  BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import About from "./components/about/about.jsx";
import Navbarexp from "./components/navbar/test";
import Single from "./pages/single_page/single.jsx";
import Loadings from "./components/loading/loading"
import Settings from "./pages/settings.jsx";
import { Context } from "./context/context.js";
import {useContext,useEffect,useState} from "react"

function App() {
  const {user} = useContext(Context)
  const [loading,setLoading]=useState(false)
  
  return (
      <>
        {
      loading ? <Loadings />:  <BrowserRouter>
      <Navbarexp />
      <Routes>
        <Route path="/" element={user ? (<Home/>) : (<Navigate  to={"/login"}/>)} />
        {/* <Route path="/" element= {<Home/>}  /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? (<Home/>) : (<Login/>)} />
        <Route path="/viewpage/:viewpageId" element={<Single />} />
        <Route path="/addPost" element={user ? (<Write/>) : (<Navigate  to={"/login"}/>)} />
        <Route path="/settings" element={user ? (<Settings/>) : (<Navigate  to={"/login"}/>)} />
        <Route path="/about/:username" element={user ? (<About/>) : (<Navigate  to={"/login"}/>)} />
      </Routes>  
    
    
      <Footer />
    </BrowserRouter>
        }
      </> 
  );
}

export default App;

