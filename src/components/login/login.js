import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./login.css"
const Login = () => {

    const [formData, setFormData] = useState({
        
        email:"",
        name:"",
        password:"",
        sex: ""
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const navigate =  useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response= await fetch("http://localhost:5000/api/user", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            navigate("/");
            alert("Successful registered !! Now you can Login to your account.");
        } catch (error){
                console.error(error.message);
        }
    }
    
    return (
        <>
            <div id="login-center-form" className="center-form">
                <h1 id="Lable-login">Login</h1>
                <Form id="form-login" onSubmit={handleSubmit}>
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