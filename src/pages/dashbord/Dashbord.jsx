import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Learning</h1>
          <p>Continue where you left off</p>
        </div>

        <div className="dashboard-grid">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎓</div>
              <p className="empty-state-title">No Courses Enrolled</p>
              <p className="empty-state-description">
                You haven't enrolled in any courses yet. Browse our catalog to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashbord;