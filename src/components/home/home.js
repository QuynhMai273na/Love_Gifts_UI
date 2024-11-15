import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import avatar from "./avatar.jpg"
import "./home.css";
import boy from "./boy.png";
import girl from "./girl.png";
import heart from "./heart.png";
const Home = () => {

    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPoint, setPoint] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // Giải mã token để lấy thông tin user
            const decoded = jwtDecode(token);
            console.log(decoded);
            setUserName(decoded.name || "User");
            setEmail(decoded.email || "Email");
            setPoint(decoded.point || "0");
        }
    }, []);
    const handleProfileClick = () => {
        navigate("/home/profile")
    }
    const handleGiftClick = () => {
        navigate("/home/gift")
    }
    const handleTaskClick = () => {
        navigate("/home/task")
    }
    return (
        <>
            <div className="homepage">
                <div className="userProfile" onClick={handleProfileClick}>
                    <img src={avatar} width="50" height="50" id="avatar"/>
                    <b className="userinfo1">{userName}</b>
                    <br/>
                    <i className="userinfo2">{userEmail}</i>
                </div>
                <div className="userPoint">
                    <p>Point: {userPoint}</p>
                </div>
                <img src={boy} id="boy" width="300" height="300"/>
                <img src={heart} id="heart" width="300" height="300"/>
                <img src={girl} id="girl"  width="300" height="300"/>
                <div id="findGift" onClick={handleGiftClick}>Find Gifts</div>
                <div id="findTask" onClick={handleTaskClick}>Find Tasks</div>
            </div>
        </>
    );
};

export default Home;