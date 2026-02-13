import React, { useState } from "react";
import "./auth.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${params.token}`,
        {
          password,
        }
      );

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
          <h2>New Password</h2>
          <p>Choose a strong password to secure your account.</p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <h2>Reset Password</h2>
          <p className="auth-subtitle">Enter your new password below</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>

            <button disabled={btnLoading} className="common-btn">
              {btnLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-footer">
            Back to <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;