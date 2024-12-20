import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./login.css"
const Login = () => {

    const [formData, setFormData] = useState({
        
        email:"",
        password:""
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const navigate =  useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = formData;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }
        
        try {
            const response = await fetch("https://api.learningjournal.space/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();

                console.log(data);
               
    
                // Lưu token vào localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
    
                // Điều hướng đến trang /home/:id
                navigate('/home/');
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("Something went wrong, please try again!");
        }
    }
    
    return (
        <>
            <div id="login-center-form" className="center-form-loginregist">
                <h1 id="Lable-login">Login</h1>
                <Form id="form-login" onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmailLogin">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"   
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordLogin">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"   
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>


                    <Button variant="dark" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Login;