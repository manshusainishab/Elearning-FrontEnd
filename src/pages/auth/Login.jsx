import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };
  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration-content">
          <div className="brand-symbol">θ</div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your learning journey and track your progress.</p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <h2>Sign In</h2>
          <p className="auth-subtitle">Enter your credentials to access your account</p>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Link to="/forgot" className="forgot-link">
              Forgot password?
            </Link>

            <button disabled={btnLoading} type="submit" className="common-btn">
              {btnLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;