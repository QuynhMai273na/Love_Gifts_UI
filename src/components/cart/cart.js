import React, {useState, useEffect} from "react";
import "./cart.css";
import { Button } from "react-bootstrap";
import API_BASE_URL from "../../config/api";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [receivedGifts, setReceivedGifts] = useState([]);

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

    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/cart/${currentUser.id}`
        );
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const fetchReceivedGifts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/received-gift/${currentUser.id}`);
        const data = await response.json();
        setReceivedGifts(data);
      }catch (error){
        console.error("Error fetching data:", error.message);
      }
    };

    const handleRemoveFromCart = async (cartId) =>{
        try{
            await fetch(`${API_BASE_URL}/api/cart/${cartId}`, {method: "DELETE"});    
            fetchCart();
            alert("Gift removed from cart successfully!");
        }catch(error){
            console.error("Error deleting data:", error.message);
        }
    }
      
    useEffect(() => {
        if (currentUser) {
          fetchCart();
          fetchReceivedGifts();
        }
      }, [currentUser]);
    const handelReceiveGift = async (cartId) =>{
      try{
        const response = await fetch(`${API_BASE_URL}/api/cart/receive/${cartId}`, {method: "POST"});
        const data = await response.json();
        
        if(response.status === 200){
          alert(`Gift received successfully! Remaining points: ${data.remainingPoints}`);
          fetchCart();
          fetchReceivedGifts();
        }
        else if(response.status === 400){
          alert(data.message);
        }
        else{
          console.error("Error receiving gift:", data.message);
          alert("Something went wrong. Please try again later.");
        }
      }catch(error){
        console.error("Error receiving gift:", error.message);
      }
    }
    



    return (
      <>
        <div className="cart-page">

          <div className="cart-container">
            <h1>My Cart</h1>
            {cartItems.length === 0 && (
              <div className="no-gift-header">
                <h3>"No available gift in cart!" </h3>
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
                      <p className="user-points">{item.gift.point} points</p>
                      <div className="cart-item-actions">
                        <Button
                          className="receive-btn"
                          onClick={() => handelReceiveGift(item._id)}
                        >
                          Receive
                        </Button>
                        <Button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="received-gift-container">
            <h1>List Received Gifts</h1>
            {receivedGifts.length === 0 && (
              <div className="no-gift-header">
                <h3>"No gift has been received!" </h3>
              </div>
            )}
            <div className="received-gift-row">
              {receivedGifts.map((cartItem) => (
                <div className="received-gift-col" key={cartItem._id.$oid}>
                  <div className="received-gift-card">
                    <img
                      src={cartItem.gift.picture}
                      alt={cartItem.gift.name}
                      className="received-gift-card-img"
                    />
                    <div className="received-gift-card-body">
                      <h3 className="received-gift-card-title">
                        {cartItem.gift.name}
                      </h3>
                      <p className="received-gift-card-text">
                        {cartItem.gift.point} Points
                      </p>
                      <Button className="status-btn" disabled>
                        Received
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

export default Cart;
