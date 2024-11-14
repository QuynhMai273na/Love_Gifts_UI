import {Route, Routes} from "react-router-dom";
import HomeHeader from "../components/header/homeHeader";
import Cart from "../components/cart/cart";
import Task from "../components/task/task";
import Home from "../components/home/home";
import Profile from "../components/profile/profile";


function HomePage() {
  return (
    <>
      <HomeHeader></HomeHeader>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/task" element={<Task></Task>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </>
    
  );
}

export default HomePage;
