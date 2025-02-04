import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUserCompany() {
  const navigate = useNavigate();

  const location = useLocation();
  const { userId, userCompany } = location.state || [];

  const [formData, setFormData] = useState({
    department: userCompany.department || "",
    name: userCompany.name || "",
    title: userCompany.title || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = {
    department: formData.department,
    name: formData.name,
    title: formData.title,
  };

  const url = `https://django-api-i7xy.onrender.com/user_api/users/${userId}/company/${userCompany.id}/`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm(
      `Are you updating User Company with User ID: ${userId} and Company ID: ${userCompany.id}?`
    );
    
    if (confirmUpdate) {
      try {
        const response = await axios.put(url, submitData);
        console.log("User Company Updated Successfully: ", response.data);
        navigate(-1);
      } catch (error) {
        console.log("Error Occurred:", error);
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
          Update Company
        </h2>
      </div>

      {/* Form Container */}
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Department */}
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                required
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter company title"
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

export default UpdateUserCompany;
