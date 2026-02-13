import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration-content">
          <div className="brand-symbol">θ</div>
          <h2>Reset Password</h2>
          <p>No worries — we'll send you a reset link to get back into your account.</p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <h2>Forgot Password</h2>
          <p className="auth-subtitle">Enter your registered email to receive a reset link</p>

          <form onSubmit={handleSubmit}>
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

            <button disabled={btnLoading} className="common-btn">
              {btnLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;