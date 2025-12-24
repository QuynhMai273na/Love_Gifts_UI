import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import "./partnerCart.css";
import API_BASE_URL from "../../config/api";

const PartnerCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

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

    const fetchPartnerCart = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/partner/cart/${currentUser.partner}`
        );
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
      
    useEffect(() => {
      if (currentUser) {
        fetchPartnerCart();
      }
    }, [currentUser]);

    return (
      <>
        <div className="cart-page">
          <div className="cart-container">
            <h1>Your Partner's Cart</h1>
            {cartItems.length === 0 && (
              <div className="no-gift-header">
                <h3>"No available gifts in your partner's cart!" </h3>
              </div>
            )}

            <div className="cart-row">
              {cartItems.map((item) => (
                <div className="cart-col" key={item._id.$oid}>
                  <div className="cart-item-card">
                    <img
                      className="cart-item-cart-img"
                      src={item.gift.picture}
                      alt={item.gift.name}
                    />
                    <div className="cart-item-card-body">
                      <h3 className="cart-item-card-title">{item.gift.name}</h3>
                      <p className="gift-points">{item.gift.point} points</p>
                      <Button
                        className={`status-btn ${
                          item.status === "pending"
                            ? "btn-pending"
                            : "btn-received"
                        }`}
                        disabled
                      >
                        {item.status === "pending" ? "Pending" : "Received"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

export default PartnerCart;
