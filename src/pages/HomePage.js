import {Route, Routes} from "react-router-dom";
import HomeHeader from "../components/header/homeHeader";
import Gift from "../components/gift/gift";
import Task from "../components/task/task";
import Home from "../components/home/home";
import Profile from "../components/profile/profile";


function HomePage() {
  return (
    <>
      <HomeHeader></HomeHeader>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/gift" element={<Gift></Gift>}></Route>
        <Route path="/task" element={<Task></Task>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </>
    
  );
}

export default HomePage;
