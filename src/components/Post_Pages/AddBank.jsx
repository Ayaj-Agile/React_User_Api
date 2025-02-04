import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddBank() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardType: "",
    currency: "",
    iban: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", formData);
    console.log("userId : ", userId);

    const submitData = {
      card_number: formData.cardNumber,
      card_type: formData.cardType,
      currency: formData.currency,
      iban: formData.iban,
    };

    const url = `https://django-api-i7xy.onrender.com/user_api/users/${userId}/bank/`;
    try {
      const response = await axios.post(url, submitData);
      console.log("Form Submitted Successfully : ", response.data);
      navigate(-1);
    } catch (error) {
      console.log("Error Occurred : ", error);
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
          Add Bank Details
        </h2>
      </div>

      {/* Form Container */}
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Card Number */}
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter card number"
                maxLength="16"
                required
              />
            </div>

            {/* Card Type */}
            <div className="mb-3">
              <label htmlFor="cardType" className="form-label">Card Type</label>
              <select
                className="form-select"
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select card type</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            {/* Currency */}
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">Currency</label>
              <select
                className="form-select"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {/* IBAN */}
            <div className="mb-3">
              <label htmlFor="iban" className="form-label">IBAN</label>
              <input
                type="text"
                className="form-control"
                id="iban"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="Enter IBAN"
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

export default AddBank;
