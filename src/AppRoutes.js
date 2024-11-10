// AppRoutes.js
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";


const AppRoutes = () => (
  <Routes>
    <Route path="/home/*" element={<HomePage />} /> 
    <Route path="/*" element={<WelcomePage />} />  
    
  </Routes>
);

export default AppRoutes;
