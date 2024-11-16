import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./usertask.css";
const UserTask = () => {

    const [usertasks, setUsertasks] = useState([]);
    const token = localStorage.getItem("token");
        let userId="";
        if (token) {
            // Giải mã token để lấy thông tin user
            const decoded = jwtDecode(token);
            console.log(decoded);
            userId = decoded.userId;
        }
    const fetchUsertasks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/usertask/${userId}`);
            const data = await response.json();
            setUsertasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    const handleCompleteTask = async () => {

    };
    useEffect(() => {
        fetchUsertasks();
    }, [userId]);

    return (
        <>
            <div className="usertask-form">
            <h1 id="usertask-label">Your Task List</h1>     
            <div className="usertask-list">
                {usertasks.map((usertask) => (
                    <div className="usertask-item" key={usertask._id}>
                        <span>
                            <strong>{usertask.task.name}</strong> - {usertask.task.point} points
                        </span>
                        <button
                            className="complete-button"
                            onClick={() => handleCompleteTask()}
                        >
                            Complete
                        </button>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
};

export default UserTask;