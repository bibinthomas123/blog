import Home from "./pages/home.js"
import Signup from "./pages/signup.js";
// import About from "./pages/about.js"
import Login from  "./pages/login"
import Footer from "./components/footer"
import Navigation from "./components/navigation.js"
import "./App.css";
import {  BrowserRouter,Route,Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


       </Routes>  
    
    <Footer />
    
    </BrowserRouter>
    
  );
}

export default App;
