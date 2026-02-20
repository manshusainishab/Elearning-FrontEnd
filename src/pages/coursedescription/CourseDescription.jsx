import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../constants";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_3GdDaiXr1ys5AO", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E learning", //your business name
      description: "Learn with us",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-detail-page">
              <div className="container">
                <div className="course-detail-layout">
                  <div className="course-detail-main">
                    <div className="course-detail-image">
                      <img
                        src={`${server}/${course.image}`}
                        alt={course.title}
                      />
                    </div>

                    <div className="course-detail-content">
                      <h1>{course.title}</h1>
                      <p className="course-detail-description">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="course-detail-sidebar">
                    <div className="course-sidebar-card">
                      <div className="course-price">
                        <span className="price-label">Price</span>
                        <span className="price-value">₹{course.price}</span>
                      </div>

                      <div className="course-info-list">
                        <div className="course-info-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          <span>Instructor</span>
                          <strong>{course.createdBy}</strong>
                        </div>
                        <div className="course-info-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          <span>Duration</span>
                          <strong>{course.duration} weeks</strong>
                        </div>
                      </div>

                      {user && user.subscription.includes(course._id) ? (
                        <button
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="common-btn btn-lg course-cta-btn"
                        >
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={checkoutHandler}
                          className="common-btn btn-lg course-cta-btn"
                        >
                          Enroll Now — ₹{course.price}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;