import React, { useState } from "react";
import "./admincourses.css";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import axios from "axios";
import { server } from "../../constants";
import toast from "react-hot-toast";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin" && user.mainrole !== "superadmin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="admin-courses">
      <div className="admin-page-header">
        <h1>Manage Courses</h1>
        <p>Add, edit, and manage your course catalog</p>
      </div>

      {/* Add Course Form */}
      <div className="add-course-card">
        <h3>Add New Course</h3>
        <form onSubmit={submitHandler} className="add-course-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input
                className="form-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Instructor</label>
              <input
                className="form-input"
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                placeholder="Instructor name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief course description"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input
                className="form-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Duration (weeks)</label>
              <input
                className="form-input"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <input type="file" required onChange={changeImageHandler} />
          </div>

          {imagePrev && (
            <img src={imagePrev} alt="Preview" className="image-preview" />
          )}

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>

      {/* Existing Courses */}
      <div className="existing-courses">
        <h3>Existing Courses ({courses ? courses.length : 0})</h3>
        <div className="courses-grid">
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No courses yet</p>
              <p className="empty-state-description">Add your first course above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;