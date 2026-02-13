import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO.png";

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`main-header${scrolled ? " header-scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={Logo} alt="Theta" className="logo-img" />
          <span className="logo-text">Theta</span>
        </Link>

        <nav className={`nav-links${menuOpen ? " nav-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/courses" onClick={closeMenu}>
            Courses
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          {isAuth ? (
            <Link to="/account" onClick={closeMenu}>
              Account
            </Link>
          ) : (
            <Link to="/login" className="nav-login-btn" onClick={closeMenu}>
              Login
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          <button
            className={`hamburger${menuOpen ? " hamburger-active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;