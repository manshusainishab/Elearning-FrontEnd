import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-symbol">θ</span>
              <span>Theta Learning</span>
            </Link>
            <p className="footer-tagline">
              Empowering learners worldwide with quality education and
              practical skills for the future.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/courses">Browse Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com/manshu.sainishab/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <AiFillFacebook />
              </a>
              <a href="https://x.com/manshusainishab/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <AiFillTwitterSquare />
              </a>
              <a href="https://www.instagram.com/manshusainishab/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <AiFillInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Theta Learning. All rights
            reserved. Made with ❤️ by{" "}
            <a
              href="https://www.github.com/manshusainishab/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manshu Saini
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;