import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "./partnerTasks.css";
import API_BASE_URL from "../../config/api";

const PartnerTasks = () => {
  const [partnerTasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
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

  // Fetch các task của partner
  const fetchPartnerTasks = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/partner/tasks/${currentUser.partner}`
      );
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchPartnerTasks();
    }
  }, [currentUser]);

  // Phân loại các tasks
  const completedTasks = partnerTasks.filter((task) => task.status.toLowerCase() === "completed");
  const pendingTasks = partnerTasks.filter((task) => task.status.toLowerCase() !== "completed");

  return (
    <div className="task-page">
    <Container className="task-container">
      <h1>List tasks of my partner</h1>

      {/* Trường hợp không có task nào */}
      {partnerTasks.length === 0 && (
        <div className="no-task-header">
          <h3>My partner has no available task! </h3>
        </div>
      )}

      {/* Trường hợp có cả hai loại task */}
      {pendingTasks.length > 0 && completedTasks.length > 0 && (
        <Row>
          {/* Cột Pending Tasks */}
          <Col md={4} className="task-column">
            <Card className="task-card shadow-lg mb-4">
              <Card.Header className="bg-danger text-white task-header">
                Pending Tasks
              </Card.Header>
              <ListGroup className="list-task">
                {pendingTasks.map((task) => (
                  <ListGroup.Item key={task._id}>
                    <div className="task-item" key={task._id}>
                      <h3 className="task-item-title">{task.task.name}</h3>
                      <span className="task-item-points">
                        {task.task.point} Points
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>

          {/* Cột Completed Tasks */}
          <Col md={4} className="task-column">
            <Card className="task-card shadow-lg mb-4">
              <Card.Header className="bg-success text-white task-header">
                Completed Tasks
              </Card.Header>
              <ListGroup variant="flush">
                {completedTasks.map((task) => (
                  <ListGroup.Item key={task._id}>
                    <div className="task-item" key={task._id}>
                      <h3 className="task-item-title">{task.task.name}</h3>
                      <span className="task-item-points">
                        {task.task.point} Points
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {/* Trường hợp chỉ có Pending Tasks */}
      {pendingTasks.length > 0 && completedTasks.length === 0 && (
        <Row className="justify-content-center">
          <Col md={6} className="task-column">
            <Card className="task-card shadow-lg mb-4">
              <Card.Header className="bg-danger text-white task-header">
                Pending Tasks
              </Card.Header>
              <ListGroup variant="flush">
                {pendingTasks.map((task) => (
                  <ListGroup.Item key={task._id}>
                    <div className="task-item" key={task._id}>
                      <h3 className="task-item-title">{task.task.name}</h3>
                      <span className="task-item-points">
                        {task.task.point} Points
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {/* Trường hợp chỉ có Completed Tasks */}
      {completedTasks.length > 0 && pendingTasks.length === 0 && (
        <Row className="justify-content-center">
          <Col md={6} className="task-column">
            <Card className="task-card shadow-lg mb-4">
              <Card.Header className="bg-success text-white text-center">
                Completed Tasks
              </Card.Header>
              <ListGroup variant="flush">
                {completedTasks.map((task) => (
                  <ListGroup.Item key={task._id}>
                    <div className="task-item" key={task._id}>
                      <h3 className="task-item-title">{task.task.name}</h3>
                      <span className="task-item-points">
                        {task.task.point} Points
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  </div>
  );
};

export default PartnerTasks;
