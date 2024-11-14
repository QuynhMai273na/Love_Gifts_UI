import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./tasks.css";
const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/task");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    const handleAddTask = () => {

    };

    useEffect(() => {
        fetchTasks();
    }, []);
    
    return (
        <>
            <div className="allTasks">
            <h2>Task List</h2>
            <div className="task-list">
                {tasks.map((task) => (
                    <div className="task-item" key={task._id}>
                        <span>
                            <strong>{task.name}</strong> - {task.point} points
                        </span>
                        <button
                            className="add-button"
                            onClick={() => handleAddTask()}
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