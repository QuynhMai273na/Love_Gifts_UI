import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Step from "../step/step";
import "./welcome.css";
import coupleImage from "./couple.png"; 
import tnguyn from "./tnguyn.jpg";
import qmai from "./qmai.jpg"
import heart from "./heart-icon.jpg"
import gift from "./gift-icon.png"
import task from "./task-icon.png"

const Welcome = () => {
    const navigate = useNavigate();

    return (
      <>
        <div className="center-form">
          <section className="introduce-section">
            <div className="introduce">
              <h1>WISH-LIST</h1>
              <p>
                Welcome to the Wish-List website. <br></br>
                Create and share your gift wishlist with your loved ones. <br></br>Explore unique gifts, 
                set your preferences, and let your partner know what makes you happy.Start 
                building your wishlist today and make every celebration special!
              </p>
              <Button className="get-start-btn" variant="primary" onClick={() => navigate('/login')} >Get Started</Button>
              {/* <Button variant="primary" onClick={() => navigate('/get-started')}>Get Start</Button> */}
            </div>
            <div className="img-couple">
                <img src={coupleImage} alt="Sample" className="small-image" />
            </div>
          </section>

          <section className="guide-section">
            <h2>How it work </h2>
            <div className="steps">
              <Step icon={heart} text="Match Couple" describe ="Find your loved and experience wonderful loving times together." />
              <Step icon={gift} text="Choose Gift" describe="Explore a wide variety of gifts and select the perfect one." />
              <Step icon={task} text="Do Tasks" describe="Complete fun tasks to earn points and surprise your partner!"/>
            </div>
          </section>

          <section className="team-section">
            <h2 className="our-team">Our Team</h2>
            <p>
              Our team is made up of passionate individuals who are dedicated to
              providing the best possible service to our customers.<br></br> We are
              constantly striving to improve and expand our team to meet the
              needs of our customers."
            </p>
            <div className="team-members">
              <div className="team-member">
                <img src={qmai} alt="Quynh_Mai" />
                <h3>Nguyen Thi Quynh Mai</h3>
                <p>Role: Designer</p>
              </div>
              <div className="team-member">
                <img src={tnguyn} alt="Thao_Nguyen" />
                <h3>Nguyen Phan Thao Nguyen</h3>
                <p>Role: Developer</p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
};

export default Welcome;