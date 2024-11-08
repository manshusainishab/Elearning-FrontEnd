import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning. All rights reserved. <br /> Made
          with ❤️ <a href="">Manshu Saini</a>
        </p>
        <div className="social-links">
          <a href="https://www.facebook.com/manshu.sainishab/">
            <AiFillFacebook />
          </a>
          <a href="https://x.com/ManshuShab31743">
            <AiFillTwitterSquare />
          </a>
          <a href="https://www.instagram.com/manshusainishab/">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;