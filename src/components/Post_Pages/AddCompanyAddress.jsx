import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AddCompanyAddress() {

  const navigator = useNavigate()

  const location = useLocation()
  const { compId } = location.state || []
  
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });
  console.log("Company Id : ", compId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Company Address :", formData);

    const submitData = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country
    }

    const url = `https://django-api-i7xy.onrender.com/user_api/users/company/${compId}/address/`
    try {
      const response = await axios.post(url, submitData)
      console.log("Form submitted Successfully : ", response.data);
      navigator('/users')
    } catch (error) {
      console.log("Error occurred : ", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
          <div className="card-header bg-success text-white d-flex align-items-center">
              <Link to="/users" className="text-white text-decoration-none">
                <i className="bi bi-arrow-left fs-4"></i>
              </Link>
              <h3 className="m-0 text-center w-100">Add Company Address</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter company address"
                    rows="3"
                    required
                  ></textarea>
                </div>

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
                    placeholder="Enter city"
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
                    placeholder="Enter state"
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
                    placeholder="Enter country"
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
      </div>
    </div>
  );
}

export default AddCompanyAddress;