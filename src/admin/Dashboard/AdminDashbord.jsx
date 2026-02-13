import React, { useEffect, useState } from "react";
import "./admindashbord.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin" && user.mainrole !== "superadmin") return navigate("/");

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
      console.log(data.stats);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="admin-dashboard">
          <div className="admin-page-header">
            <h1>Dashboard</h1>
            <p>Overview of your learning platform</p>
          </div>

          <div className="admin-stats-grid">
            <div className="metric-card">
              <div className="metric-icon" style={{ background: 'rgba(108, 60, 225, 0.1)', color: '#6C3CE1' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </div>
              <div className="metric-info">
                <span className="metric-value">{stats.totalCourses}</span>
                <span className="metric-label">Total Courses</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              </div>
              <div className="metric-info">
                <span className="metric-value">{stats.totalLectures}</span>
                <span className="metric-label">Total Lectures</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <div className="metric-info">
                <span className="metric-value">{stats.totalUser}</span>
                <span className="metric-label">Total Users</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashbord;