import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

function UpdateUser() {
  const location = useLocation();
  const { userDetails } = location.state || [];

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: userDetails.first_name || "",
    lastName: userDetails.last_name || "",
    age: userDetails.age || "",
    birthDate: userDetails.birth_date || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converting to Specified format
    const formattedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      birth_date: new Date(formData.birthDate).toISOString().split("T")[0], // Format date to YYYY-MM-DD
      age: parseInt(formData.age), // Ensure age is an integer
    };

    let confirmUpdate = window.confirm('Confirm: Are you updating user details with ID: ' + userDetails.id);
    
    if (confirmUpdate) {
      console.log("User Data: ", formattedData);
      const url = `http://127.0.0.1:8000/user_api/users/${userDetails.id}/`;
      try {
        const response = await axios.put(url, formattedData);
        
        console.log("User Updated Successfully: ", response.data);
        console.log("Updated data: ", formattedData);
        navigate('/users'); // Navigate back to users list
      } catch (error) {
        console.log("Error Occurred: ", error);
      }
    }
  };

  return (
    <div className="flex-grow-1 p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-2" style={{ maxWidth: "80%", margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}  // Navigate one step back
          className="text-white bg-secondary rounded-circle p-3 d-flex justify-content-center align-items-center border-0"
          style={{ width: "50px", height: "50px" }}
        >
          <i className="bi bi-arrow-left fs-3"></i>
        </button>
        <h2 className="ms-3 mb-0 text-dark" style={{ width: "calc(100% - 70px)", textAlign: "center" }}>
          Update User
        </h2>
      </div>

      {/* Form Container */}
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
              />
            </div>

            {/* Birthdate */}
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-outline-success w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
