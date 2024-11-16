import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./usertask.css";
const UserTask = () => {

    const [usertasks, setUsertasks] = useState([]);
    const token = localStorage.getItem("token");
    const [userPoint, setPoint] = useState("");
    
    const getUserPoint = async () => {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const user = decoded.userId;
        try {
            const response = await fetch(`http://localhost:5000/api/user/${user}`);
            const data = await response.json();
            setPoint(data.point);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
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
    const handleCompleteTask = async (usertaskId) => {

        try {
            const response = await fetch(`http://localhost:5000/api/usertask/complete/${usertaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const updatedTask = await response.json();

            // Cập nhật lại danh sách usertasks
            setUsertasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? { ...task, status: "Completed" } : task
                )
            );
            const updatePoint = userPoint + updatedTask.task.point;
            setPoint(updatePoint);
        } catch(error) {
            console.error("Error completing task:", error);
        }

    };
    useEffect(() => {
        fetchUsertasks();
        getUserPoint();
    }, [userId]);

    return (
        <>
            <div className="usertask-form">
            <div className="usertaskPoint">
                    <p>Point: {userPoint}</p>
                </div>
            <h1 id="usertask-label">Your Task List</h1>     
            <div className="usertask-list">
                {usertasks.map((usertask) => (
                    <div className="usertask-item" key={usertask._id}>
                        <span>
                            <strong>{usertask.task.name}</strong> - {usertask.task.point} points
                        </span>
                        <button
                            className="complete-button"
                            onClick={() => handleCompleteTask(usertask._id)}
                            disabled={usertask.status === "Completed"}
                        >
                           {usertask.status === "Completed" ? "Completed" : "Complete"}
                        </button>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
};

export default UserTask;