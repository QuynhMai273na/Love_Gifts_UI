import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./usertask.css";
const UserTask = () => {
  const [usertasks, setUsertasks] = useState([]);
  const [completedTasks, setComplete]=useState([]);
  const [incompleteTasks, setIncomplete]=useState([]);
  const token = localStorage.getItem("token");
  const [userPoint, setPoint] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
        setCurrentUser(user);        
        setUserId(user.id);
    }
  }, []);

  const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (!user) return null;
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const getUserPoint = async () => {
    // const userId = currentUser.id;
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      setPoint(data.point);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUsertasks = async () => {
    // const userId = currentUser.id;

    try {
      const response = await fetch(
        `http://localhost:5000/api/usertask/${userId}`
      );
      const data = await response.json();
      setUsertasks(data);
      const completed = data.filter((task) => task.status.toLowerCase() === "completed");
      setComplete(completed);
      const incomplete = data.filter((task) => task.status.toLowerCase() === "incomplete");
      setIncomplete(incomplete);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleCompleteTask = async (usertaskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/usertask/complete/${usertaskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedTask = await response.json();

      // Cập nhật lại danh sách usertasks
      setUsertasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, status: "Completed" } : task
        )
      );
      const updatePoint = userPoint + updatedTask.task.point;
      setPoint(updatePoint);
      await fetchUsertasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };
  useEffect(() => {
    console.log(currentUser);
    console.log(userId)
    if (userId) {
        fetchUsertasks();
        getUserPoint();
    }

  }, [userId]);
  

  return (
    <>
      <div className="usertask-form">
        <div className="usertaskPoint">
          <p>Point: {userPoint}</p>
        </div>
        <div className="usertask-container">
        <h1 id="usertask-label">My Task List</h1>
       
        <div className="usertask-list">
          {usertasks.length >0 &&
            incompleteTasks.map((usertask) => (
              <div className="usertask-item" key={usertask._id}>
                <span>
                  <strong>{usertask.task.name}</strong> - {usertask.task.point}{" "}
                  points
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
            <div className="complete-container">
        <h1 id="completed-label">Completed Tasks</h1>
        <div className="completed-list">
          {usertasks.length>0 &&
            completedTasks.map((usertask) => (
              <div className="completed-item" key={usertask._id}>
                <span>
                  <strong>{usertask.task.name}</strong> - {usertask.task.point}{" "}
                  points
                </span>
              </div>
            ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default UserTask;
