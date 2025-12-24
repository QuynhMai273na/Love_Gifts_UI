import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import avatar from "./avatar.jpg"
import "./home.css";
import boy from "./boy.png";
import girl from "./girl.png";
import heart from "./heart.png";
import API_BASE_URL from "../../config/api";

const Home = () => {

    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPoint, setPoint] = useState("");
    const navigate = useNavigate();

    const getUserPoint = async () => {
        const user = localStorage.getItem("user");
        const userObject = JSON.parse(user);
        const userId = userObject.id;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
            const data = await response.json();
            setPoint(data.point);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user");        

        if (user) {
            const userObject = JSON.parse(user);
            setUserName(userObject.name || "User");
            setEmail(userObject.email || "Email");
            setPoint(userObject.point || "0");
        }
        getUserPoint();
    }, []);
    const handleProfileClick = () => {
        navigate("/home/profile")
    }
    const handleGiftClick = () => {
        navigate("/home/gift")
    }
    const handleTaskClick = () => {
        navigate("/home/tasks")
    }
    return (
        <>
            <div className="homepage">
                <div className="user">

                    <div className="userProfile" onClick={handleProfileClick}>
                        <img src={avatar} width="50" height="50" id="avatar"/>
                        <b className="userinfo1">{userName}</b>
                        <br/>
                        <i className="userinfo2">{userEmail}</i>
                    </div>
                    <div className="userPoint">
                        <p>Point: {userPoint}</p>
                    </div>
                </div>
                <div className="functions">
                <div id="findGift" onClick={handleGiftClick}>Find Gifts</div>
                <div id="findTask" onClick={handleTaskClick}>Find Tasks</div>

                </div>
                <div className="gifs">
                <img src={boy} id="boy" width="300" height="300"/>
                <img src={heart} id="heart" width="300" height="300"/>
                <img src={girl} id="girl"  width="300" height="300"/>

                </div>
            </div>
        </>
    );
};

export default Home;
