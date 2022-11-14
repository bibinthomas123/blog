import Home from "./pages/home.js"
import Signup from "./pages/signup.js";
import Write from "./pages/Write/write";
// import About from "./pages/about.js"
import Login from  "./pages/login"
import Footer from "./components/footer/footer"
// import Navigation from "./components/navigation.js"
import {  BrowserRouter,Route,Routes} from "react-router-dom";
import Navbarexp from "./components/navbar/test";
import Single from "./pages/single_page/single.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbarexp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewpage" element={<Single />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addPost" element={<Write />} />
      </Routes>  
    
    
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
