import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./register.css";

const Register = () => {

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
    const navigate =  useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, name, password, sex } = formData;
        if (email==="" || name==="" || password==="" || sex==="") {
            alert("Please enter all neccessary information");
        return;
        }

        try {
            const response= await fetch("http://localhost:5000/api/user", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert("Sign up successful! Now you can login to your account.");
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(`Sign up failed: ${errorData.error}`);
            }
        } catch (error){
                console.error(error.message);
        }
    }
    
    return (
        <>
            <div className="center-form">
                <h1 id="Lable-regis">Register your account</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"   
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            name="name"
                            placeholder="Enter you name"   
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"   
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                            <div className="gender-options">
                              <Form.Check
                                inline
                                type="radio"
                                id="male"
                                label="Male"
                                name="sex"
                                value="male"
                                checked={formData.sex === "male"}
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="female"
                                label="Female"
                                name="sex"
                                value="female"
                                checked={formData.sex === "female"}
                                onChange={handleInputChange}
                            />
                            </div>
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Register;