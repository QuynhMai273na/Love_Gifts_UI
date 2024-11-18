import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./profile.css";
const Profile = () => {

    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPoint, setPoint] = useState("");
    const [userGender, setGender] = useState("");
    const [userPartner, setPartner] = useState("");
    const [userPartnerTmp, setPartnerTmp] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
  
    const getUserInfo = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const userObject = JSON.parse(user);
            setUserName(userObject.name || "User");
            setEmail(userObject.email || "Email");
            setPoint(userObject.point || "0");
            setGender(userObject.sex || "Gender");
            setPartner(userObject.partner ?? ""); // Sử dụng `??` để kiểm tra `null` hoặc `undefined`
        }
    };
    const handleInputSearchChange = (event) => {
        const { value} = event.target;
        setPartnerTmp(value);
    }
    // Lấy thông tin điểm của user từ API
    const getUserPoint = async () => {
        const user = localStorage.getItem("user");
        const userObject = JSON.parse(user);
        const userId = userObject.id;

        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`);
            const data = await response.json();
            setPoint(data.point);
            setPartner(data.partner);
            console.log(data.partner);
        } catch (error) {
            console.error("Error fetching user point:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getUserPoint();
    }, []);


    // Hàm tìm kiếm partner theo email
    const handleSearchPartner = async () => {
        setIsSearching(true);
        const user = localStorage.getItem("user");
        const userObject = JSON.parse(user);
        const userId = userObject.id;
        const partnerEmail = userPartnerTmp;
        console.log(partnerEmail);
        try {
            const response = await fetch(`http://localhost:5000/api/user/partner/${userId}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ partnerEmail }),
            });
            const data = await response.json();
            console.log(data.user.partner);
            if (data.user.partner) {
                alert('Successfully matched');
                //setPartner(data.partner.email);
                setPartner(userPartnerTmp);
            } else {
                alert("Partner not found");
            }
        } catch (error) {
            console.error("Error searching for partner:", error);
            alert("An error occurred while searching for the partner");
        }
        setIsSearching(false);
    };
    const handlePartnerCartClick = () => {
        navigate("/home/partner/cart");
    };

    const handlePartnerTaskClick = () => {
        navigate("/home/partner/tasks");
    };

    return (
        <>
            <div className="profile-container">
                <h1 id="profile-label">Your Profile</h1>
            <div className="profile-info">
                <p className="info-items"><strong>Name:</strong> {userName}</p>
                <p className="info-items"><strong>Gender:</strong> {userGender}</p>
                <p className="info-items"><strong>Email:</strong> {userEmail}</p>
                <p className="info-items"><strong>Point:</strong> {userPoint}</p>
                <p className="info-items">
                    <strong>Partner:</strong> 
                    {userPartner ? userPartner : "You don't have partner !"}
                </p>
            </div>
            {(userPartner) && (
                <Form className="partner-form">
                    <Button id="view-cart" onClick={handlePartnerCartClick}>
                        View Partner's Cart
                    </Button>
                    <Button id="view-task" onClick={handlePartnerTaskClick}>
                        View Partner's Task
                    </Button>
                </Form>
            )}
            {(!userPartner || userPartner === "") && (
                <Form className="partner-form">
                    <Form.Group controlId="partnerEmail">
                        <Form.Label id="findpartner-label">Find your partner:  </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your partner email"
                            value={userPartnerTmp}
                            onChange={handleInputSearchChange}
                            disabled={ isSearching}
                            id="findpartner-input"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleSearchPartner}
                        disabled={isSearching}
                        id="findpartner-button"
                    >
                        {isSearching ? "Searching..." : "Match"}
                    </Button>
                </Form>
            )}
        </div>
        </>
    );
};

export default Profile;