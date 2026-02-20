import React from "react";
import "./courseCard.css";
import { server } from "../../constants";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="course-card card">
      <div className="course-card-image">
        <img src={`${server}/${course.image}`} alt={course.title} />
        <div className="course-card-badge badge badge-primary">
          ₹{course.price}
        </div>
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <div className="course-card-meta">
          <span className="course-card-instructor">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            {course.createdBy}
          </span>
          <span className="course-card-duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {course.duration} weeks
          </span>
        </div>
        <div className="course-card-actions">
          {isAuth ? (
            <>
              {user && user.role !== "admin" ? (
                <>
                  {user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="common-btn"
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="common-btn"
                    >
                      Get Started
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              )}
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="common-btn">
              Get Started
            </button>
          )}

          {user && user.role === "admin" && (
            <button
              onClick={() => deleteHandler(course._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;