import React from "react";
import "./about.css";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About <span className="text-gradient">Theta Learning</span></h1>
          <p className="about-hero-text">
            We are dedicated to providing high quality online courses to help
            individuals learn and grow in their desired fields. Our experienced
            instructors ensure that each course is tailored for effective learning
            and practical application.
          </p>
        </div>
      </section>

      <section className="about-values section">
        <div className="container">
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon" style={{ background: 'rgba(108, 60, 225, 0.1)', color: '#6C3CE1' }}>
                <FiTarget />
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize education by making world-class learning
                accessible to everyone, everywhere — regardless of background
                or location.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                <FiEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                A world where continuous learning is the norm, and every
                individual has the tools to achieve their full potential through
                quality education.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                <FiHeart />
              </div>
              <h3>Our Values</h3>
              <p>
                Excellence, accessibility, and community. We believe in creating
                a supportive environment where learners thrive and instructors
                inspire.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;