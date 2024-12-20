import {Route, Routes} from "react-router-dom";
import HomeHeader from "../components/header/homeHeader";
import Cart from "../components/cart/cart";
import UserTask from "../components/usertask/usertask";
import Home from "../components/home/home";
import Profile from "../components/profile/profile";
import Gift from "../components/gift/gitft";
import Tasks from "../components/tasks/tasks";
import PartnerCart from "../components/partnerCart/partnerCart";
import PartnerTasks from "../components/partnerTasks/partnerTasks";


function HomePage() {
  return (
    <>
      <HomeHeader></HomeHeader>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/gift" element={<Gift></Gift>}></Route>
        <Route path="/task" element={<UserTask></UserTask>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/tasks" element={<Tasks></Tasks>}></Route>
        <Route path="/partner/cart" element={<PartnerCart></PartnerCart>}></Route>
        <Route path="/partner/tasks" element={<PartnerTasks></PartnerTasks>}></Route>
        
      </Routes>
    </>
    
  );
}

export default HomePage;
