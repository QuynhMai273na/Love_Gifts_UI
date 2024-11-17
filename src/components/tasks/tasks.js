import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./tasks.css";
import taskicon from "./taskicon.png";
import {jwtDecode} from "jwt-decode";
const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState("");
  
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

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/task");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    const handleAddTask = async (taskId) => {
        if (!taskId || !currentUser) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/usertask/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, taskId }),
            });
    
            if (response.ok) {
                alert("You have successfully added the task to your list!");
            } else {
                alert("An error occurred while adding the task.");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    
    return (
        <>
            <div className="allTasks">
                <h1 id="task-label">Task List</h1>
                <img src={taskicon} id="task-icon" width="120" height="120"/>
            <div className="task-list">
                {tasks.map((task) => (
                    <div className="task-item" key={task._id}>
                        <span>
                            <strong>{task.name}</strong> - {task.point} points
                        </span>
                        <button
                            className="add-button"
                            onClick={() => handleAddTask(task._id)}
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
};

export default Tasks;