import React, { useEffect, useState } from "react";
import "./adminusers.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update this user's role")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="admin-users">
          <div className="admin-page-header">
            <h1>User Management</h1>
            <p>Manage user roles and permissions</p>
          </div>

          <div className="users-table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((e, i) => (
                    <tr key={e._id}>
                      <td>{i + 1}</td>
                      <td>
                        <span className="user-name">{e.name}</span>
                      </td>
                      <td>
                        <span className="user-email">{e.email}</span>
                      </td>
                      <td>
                        <span className={`badge ${e.role === "admin" ? "badge-primary" : "badge-secondary"}`}>
                          {e.role}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => updateRole(e._id)}
                          className="btn btn-secondary btn-sm"
                        >
                          Update Role
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-cell">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;