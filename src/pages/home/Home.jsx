import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import { FiBookOpen, FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";
import ParticleNetwork from "./ParticleNetwork";

const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing effect
  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="hero-highlight typewriter-text">
      {`${words[index].substring(0, subIndex)}${blink ? "" : ""}`}
    </span>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <ParticleNetwork />
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀</span> Start your learning journey today
          </div>
          <h1>
            Learn Without <Typewriter words={["Limits", "Boundaries", "Fear", "Barriers"]} />
          </h1>
          <p className="hero-description">
            Master new skills with expert-led courses. From web development to
            AI — learn at your own pace and advance your career.
          </p>
          <div className="hero-actions">
            <button
              onClick={() => navigate("/courses")}
              className="common-btn btn-lg"
            >
              Explore Courses
            </button>
            <button
              onClick={() => navigate("/about")}
              className="btn btn-secondary btn-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <div className="stat-label">Expert Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Active Learners</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">Why Choose Theta?</h2>
            <p className="section-subtitle">
              Everything you need to accelerate your learning
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(138, 75, 175, 0.1)', color: 'var(--color-primary)' }}>
                <FiBookOpen />
              </div>
              <h3>Expert-Led Courses</h3>
              <p>Learn from industry professionals with real-world experience and practical knowledge.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                <FiTrendingUp />
              </div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed progress tracking and completion certificates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                <FiAward />
              </div>
              <h3>Quality Content</h3>
              <p>Curated curriculum with video lectures, hands-on projects, and interactive assessments.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                <FiUsers />
              </div>
              <h3>Community</h3>
              <p>Join a community of passionate learners and collaborate on projects together.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;