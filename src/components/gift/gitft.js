import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './gift.css';

const Gift = () => {
  const [gifts, setGifts] = useState([]);
  const handleAddToCart = (gift) => {
    // Ở đây bạn có thể thêm logic để lưu gift vào state giỏ hàng hoặc gọi API
  };
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gift');
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error('Error fetching data', error.message);
      }
    };
    fetchGifts();
  }, []);

  return (
    <div className="gift-container">
      <h1>Wish List</h1>
      <div className="gift-row">
        {gifts.map((gift) => (
          <div className="gift-col" key={gift._id.$oid}>
            <div className="gift-card">
              <img src={gift.picture} alt={gift.name} />
              <div className="gift-card-body">
                <h3 className="gift-card-title">{gift.name}</h3>
                <p className="gift-card-text">{gift.point} Points</p>
                <Button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(gift)}>
                  Add to Cart
                </Button>
              </div>
                {/* <Button className="add-gift-btn">Add to Wish List</Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gift;
