import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div className="account-page">
      <div className="container">
        {user && (
          <div className="profile-card animate-fade-in-up">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-details">
                <h2>{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                {user.role === "admin" && (
                  <span className="badge badge-primary">Admin</span>
                )}
              </div>
            </div>

            <div className="profile-actions">
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                My Dashboard
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="btn btn-secondary"
                >
                  <MdDashboard />
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={logoutHandler}
                className="btn btn-danger"
              >
                <IoMdLogOut />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;