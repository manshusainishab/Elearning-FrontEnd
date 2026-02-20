import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../constants";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="course-study-page">
          <div className="container">
            <div className="study-card animate-fade-in-up">
              <div className="study-image">
                <img src={`${server}/${course.image}`} alt={course.title} />
              </div>
              <div className="study-info">
                <h1>{course.title}</h1>
                <p className="study-description">{course.description}</p>
                <div className="study-meta">
                  <div className="study-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span>by {course.createdBy}</span>
                  </div>
                  <div className="study-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span>{course.duration} weeks</span>
                  </div>
                </div>
                <Link to={`/lectures/${course._id}`} className="common-btn btn-lg">
                  Start Lectures
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;