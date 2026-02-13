import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>Explore Courses</h1>
          <p>Browse our collection of expert-led courses and start learning today</p>
        </div>

        <div className="courses-grid">
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <p className="empty-state-title">No Courses Available</p>
              <p className="empty-state-description">
                New courses are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;