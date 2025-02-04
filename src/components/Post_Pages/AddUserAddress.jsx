import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AddUserAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    postCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      city: formData.city,
      state: formData.state,
      post_code: parseInt(formData.postCode),
      country: formData.country,
    };

    const url = `https://django-api-i7xy.onrender.com/user_api/users/${userId}/address/`;

    try {
      await axios.post(url, submitData);
      navigate(-1, { state: { refresh: true } });
    } catch (error) {
      console.error("Error Occurred :", error);
    }
  };

  return (
    <div className="flex-grow-1 p-4">
      {/* Header Section */}
      <div
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ maxWidth: "80%", margin: "0 auto" }}
      >
        <button
          onClick={() => navigate(-1)}  // Navigate one step back
          className="text-white bg-secondary rounded-circle p-3 d-flex justify-content-center align-items-center border-0"
          style={{ width: "50px", height: "50px" }}
        >
          <i className="bi bi-arrow-left fs-3"></i>
        </button>
        <h2
          className="ms-3 mb-0 text-dark"
          style={{ width: "calc(100% - 70px)", textAlign: "center" }}
        >
          Add New Address
        </h2>
      </div>

      {/* Form Container */}
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* City */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />
            </div>

            {/* State */}
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />
            </div>

            {/* Post Code */}
            <div className="mb-3">
              <label htmlFor="postCode" className="form-label">
                Post Code
              </label>
              <input
                type="number"
                className="form-control"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                placeholder="Enter your post code"
                required
              />
            </div>

            {/* Country */}
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
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

export default AddUserAddress;
