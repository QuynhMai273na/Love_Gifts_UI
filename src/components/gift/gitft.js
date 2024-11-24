import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./gift.css";

const Gift = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  useEffect(() => {
    fetchGifts();
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

  const fetchGifts = async () => {
    try {
      const response = await fetch("https://api.learningjournal.space/api/gift");
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleAddToCart = async (giftId) => {
    console.log("Adding gift to cart:", giftId);
    if (!currentUser) {
      alert("Please log in first");
      return;
    }

    try {
      await fetch("https://api.learningjournal.space/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: currentUser.id,
          giftId: giftId,
        }),
      });

      alert("Gift added to cart");
    } catch (error) {
      console.error("Error adding gift to cart:", error);
    }
  };

  return (
    <div className="gift-page">
      <div className="gift-container">
        <h1>Wish List</h1>
        {gifts.length === 0 && (
          <div className="no-gift-header">
            <h3>"No available gifts!" </h3>
          </div>
        )}
        <div className="gift-row">
          {gifts.map((gift) => (
            <div className="gift-col" key={gift._id.$oid}>
              <div className="gift-card">
                <img
                  src={gift.picture}
                  alt={gift.name}
                  className="gift-card-img"
                />
                <div className="gift-card-body">
                  <h3 className="gift-card-title">{gift.name}</h3>
                  <p className="gift-card-text">{gift.point} Points</p>
                  <Button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(gift._id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gift;
