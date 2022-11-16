import Home from "./pages/home.js"
import Signup from "./pages/signup.js";
import Write from "./pages/Write/write";
import Login from  "./pages/login"
import Footer from "./components/footer/footer"
// import Navigation from "./components/navigation.js"
import {  BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Navbarexp from "./components/navbar/test";
import Single from "./pages/single_page/single.jsx";
import Settings from "./pages/settings.jsx";

function App() {
  const user = true
  return (
    <BrowserRouter>
      <Navbarexp />
      <Routes>
        <Route path="/" element={user ? (<Home/>) : (<Navigate  to={"/login"}/>)} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? (<Home/>) : (<Login/>)} />
        <Route path="/viewpage/:viewpageId" element={<Single />} />
        <Route path="/addPost" element={user ? (<Write/>) : (<Navigate  to={"/login"}/>)} />
        <Route path="/settings" element={user ? (<Settings/>) : (<Navigate  to={"/login"}/>)} />
      </Routes>  
    
    
      <Footer />
    </BrowserRouter>
  );
}

export default App;
