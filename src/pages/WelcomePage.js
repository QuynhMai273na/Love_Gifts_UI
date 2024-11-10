import {Route, Routes} from "react-router-dom";
import WelcomeHeader from "../components/header/welcomeHeader";
import Welcome from "../components/welcome/welcome";
import Login from "../components/login/login";
import Register from "../components/register/register";


function WelcomePage() {
  return (
    <>
      <WelcomeHeader></WelcomeHeader>
      <Routes>
        <Route path="/" element={<Welcome></Welcome>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </>
    
  );
}

export default WelcomePage;
