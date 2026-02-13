import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(progress);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          {/* Progress Bar */}
          <div className="lecture-progress-bar">
            <div className="container">
              <div className="progress-info">
                <span>
                  {completedLec} of {lectLength} lectures completed
                </span>
                <span className="progress-percent">{completed}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${completed}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lecture-layout">
            {/* Video Player */}
            <div className="lecture-main">
              {lecLoading ? (
                <div className="lecture-loading">
                  <Loading />
                </div>
              ) : (
                <>
                  {lecture.video ? (
                    <div className="lecture-player">
                      <video
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <div className="lecture-details">
                        <h1>{lecture.title}</h1>
                        <p>{lecture.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="lecture-placeholder">
                      <div className="empty-state">
                        <div className="empty-state-icon">▶️</div>
                        <p className="empty-state-title">
                          Select a Lecture
                        </p>
                        <p className="empty-state-description">
                          Choose a lecture from the sidebar to start watching
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lecture-sidebar">
              <div className="sidebar-header">
                <h3>Course Content</h3>
                {user && user.role === "admin" && (
                  <button
                    className={`btn ${show ? "btn-secondary" : "btn-primary"} btn-sm`}
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Cancel" : "+ Add"}
                  </button>
                )}
              </div>

              {show && (
                <div className="lecture-form animate-fade-in">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        className="form-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Lecture title"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <input
                        className="form-input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description"
                        required
                      />
                    </div>

                    <div className="form-group form-file">
                      <input
                        type="file"
                        placeholder="choose video"
                        onChange={changeVideoHandler}
                        required
                      />
                    </div>

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                        className="video-preview"
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="common-btn"
                      style={{ width: "100%", marginTop: "var(--space-3)" }}
                    >
                      {btnLoading ? "Uploading..." : "Add Lecture"}
                    </button>
                  </form>
                </div>
              )}

              <div className="lecture-list">
                {lectures && lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={i} className="lecture-item-wrapper">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`lecture-item ${lecture._id === e._id ? "lecture-item-active" : ""
                          }`}
                      >
                        <span className="lecture-number">{i + 1}</span>
                        <span className="lecture-title">{e.title}</span>
                        {progress[0] &&
                          progress[0].completedLectures.includes(e._id) && (
                            <span className="lecture-completed">
                              <TiTick />
                            </span>
                          )}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state" style={{ padding: "var(--space-8)" }}>
                    <p className="empty-state-title">No Lectures Yet</p>
                    <p className="empty-state-description">
                      Lectures will appear here once added
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;