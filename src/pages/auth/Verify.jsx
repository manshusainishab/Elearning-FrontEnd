import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration-content">
          <div className="brand-symbol">θ</div>
          <h2>Almost There!</h2>
          <p>Verify your email to complete registration and start learning.</p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <h2>Verify Account</h2>
          <p className="auth-subtitle">Enter the OTP sent to your email address</p>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="otp">Verification Code</label>
              <input
                id="otp"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>

            <div className="captcha-wrapper">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
            </div>

            {show && (
              <button disabled={btnLoading} type="submit" className="common-btn">
                {btnLoading ? "Verifying..." : "Verify Account"}
              </button>
            )}
          </form>

          <p className="auth-footer">
            Go to <Link to="/login">Sign In</Link> page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;