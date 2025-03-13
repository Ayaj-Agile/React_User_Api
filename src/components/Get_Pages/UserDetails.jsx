import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); // Access location state
  const userLocation = location.state || []

  const fetchUserDetails = async () => {
    console.log("Fetching Data From Api..");
    try {
      const response = await axios.get('http://127.0.0.1:8000/user_api/users/');
      setUsers(response.data.users);  // assuming the response structure has a 'users' field
      setLoading(false);
    } catch (e) {
      console.log("Error :", e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Conditionally filter users based on location state (young, old, all)
  const filterUsers = () => {
    if (userLocation.state === 'young') {
      return users.filter(user => user.age <= 35);
    } else if (userLocation.state === 'old') {
      return users.filter(user => user.age > 35);
    }
    return users;
 // 'all' case, no filtering
  };

  const filteredUsers = filterUsers();

  // To Delete a User
  const DeleteUser = async (userId) => {
    console.log(userId);

    let confirmDelete = window.confirm("Confirm to delete a user with ID: " + userId);

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user_api/users/${userId}/`);
        console.log("User Deleted Successfully: ", response.data);
        await fetchUserDetails(); // re-fetch the users after deletion
      } catch (error) {
        console.log("Error Occurred: ", error);
      }
    }
  };

  return (
    <div className="flex-grow-1 p-3">
      {/* Conditionally render the section only if the current route is "/user_details" */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h2>User Profiles</h2>
            <p>This is the profile management section.</p>
          </div>
          <Link to="/add_user" className="btn btn-primary">Add User</Link>
        </div>
      </div>

      {/* Scrollable Table Section */}
      <div className="row">
        <div className="col-12">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center">Loading...</td></tr>
                ) : (
                  filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.age}</td>
                        <td>
                          <Link
                            to={'/user_details'}
                            className="btn btn-info btn-sm mx-1"
                            state={{ userId: user.id }}
                          >
                            <i className="bi bi-eye"></i> {/* View Icon */}
                          </Link>
                          <Link
                            to={"/update_user"}
                            className="btn btn-warning btn-sm mx-1"
                            state={{ userDetails: user }}
                          >
                            <i className="bi bi-pencil-square"></i> {/* Edit Icon */}
                          </Link>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => DeleteUser(user.id)}
                          >
                            <i className="bi bi-trash"></i> {/* Delete Icon */}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center text-danger">No Users are There Please add New Users..!</td></tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
