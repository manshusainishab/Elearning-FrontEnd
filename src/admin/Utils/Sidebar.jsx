import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import {
  AiFillHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaBook, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const { user } = UserData();
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", icon: <AiFillHome />, label: "Dashboard" },
    { to: "/admin/course", icon: <FaBook />, label: "Courses" },
  ];

  if (user && user.mainrole === "superadmin") {
    navItems.push({ to: "/admin/users", icon: <FaUsers />, label: "Users" });
  }

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-symbol">θ</span>
        <span>Admin</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`sidebar-link ${location.pathname === item.to ? "sidebar-link-active" : ""
              }`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/account" className="sidebar-link">
          <span className="sidebar-icon"><AiOutlineLogout /></span>
          Back to App
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;