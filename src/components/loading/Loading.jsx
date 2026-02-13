import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="loading-logo">θ</div>
        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;