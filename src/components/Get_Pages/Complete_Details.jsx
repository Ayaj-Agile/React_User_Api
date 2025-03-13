import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons for Edit, Delete, and Add
import { Link, useLocation } from "react-router-dom";

function Complete_Details() {
    const [userDetails, setUserDetails] = useState({}); // Initialize state

    // Get location data
    const location = useLocation();
    const userId = location.state ? location.state.userId : null; // Handle case where state or userId might be undefined

    console.log("location.state: ", location.state); // Debugging log
    console.log("userId: ", userId); // Debugging log

    const getUserDetails = async () => {
        if (!userId) {
            console.log("No userId to fetch details for");
            return; // Return early if userId is not available
        }
        try {
            
            // `https://django-api-i7xy.onrender.com/user_api/users/${userId}/`
            const response = await axios.get(`http://127.0.0.1:8000/user_api/users/${userId}/`);
            setUserDetails(response.data);
        } catch (error) {
            console.log("Error Occurred: ", error);
        }
    };

    console.log("userDetails : ", userDetails);

    useEffect(() => {
        if (userId) {
            getUserDetails();
        }
    }, [userId]); // Trigger only when userId changes

    // To Delete a User Address
    const DeleteAddress = async (userId, addId) => {
        const confirmDelete = confirm(`Confirm to delete address ID ${addId} for User ID ${userId}?`);
        if (confirmDelete) {
            try {
            // `https://django-api-i7xy.onrender.com/user_api/users/${userId}/address/${addId}/`
            await axios.delete(`http://127.0.0.1:8000/user_api/users/${userId}/address/${addId}/`);
            getUserDetails();
        } catch (error) {
            console.error("Error deleting address:", error);
        }
        }
    };

    // To Delete a User Bank
    const DeleteBank = async (userId, bankId) => {
        const confirmDelete = confirm(`Confirm to delete bank ID ${bankId} for User ID ${userId}?`);
        if (confirmDelete) {
        try {
            await axios.delete(`http://127.0.0.1:8000/user_api/users/${userId}/bank/${bankId}/`);
            getUserDetails();
        } catch (error) {
            console.error("Error deleting bank:", error);
        }
        }
    };

    // To Delete a User Bank
    const DeleteCompany = async (userId, compId) => {
        const confirmDelete = confirm(`Confirm to delete company ID ${compId} for User ID ${userId} ?`);
        if (confirmDelete) {
        try {
            await axios.delete(`http://127.0.0.1:8000/user_api/users/${userId}/company/${compId}/`);
            getUserDetails();
        } catch (error) {
            console.error("Error deleting company:", error);
        }
        }
    };

    return (
        <div className="flex-grow-1">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div style={{ maxHeight: "520px", overflowY: "auto" }}>
                        
                        {/* User Profile */}
                        <div className="d-flex align-items-start mb-4">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="User"
                                className="rounded-circle me-4"
                                style={{ width: "150px", height: "150px" }}
                            />
                            <div>
                                <h3>{userDetails.first_name} {userDetails.last_name}</h3>
                                <p><strong>Age:</strong> {userDetails.age}</p>
                                <p><strong>Date of Birth:</strong> {userDetails.birth_date}</p>
                            </div>
                        </div>

                        <hr />

                        {/* Address Details */}
                        <div className="mb-4 col-10">
                            <h5>Address</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Postcode</th>
                                        <th>Country</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.address && userDetails.address.length > 0 ? (
                                        userDetails.address.map((address) => (
                                            <tr key={address.id}>
                                                <td>{address.state}</td>
                                                <td>{address.city}</td>
                                                <td>{address.post_code}</td>
                                                <td>{address.country}</td>
                                                <td>
                                                    <Link
                                                        to={'/update_user_address'}
                                                        className="btn btn-warning btn-sm me-2"
                                                        state={{userId:userId, userAddress:address}}
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm me-2"
                                                        onClick={()=>DeleteAddress(userId,address.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No address details available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Link
                                to={'/add_user_address'}
                                className="btn btn-success mt-3"
                                state={{userId:userId}}
                            >
                                <FaPlus /> Add Address
                            </Link>
                        </div>

                        <hr />

                        {/* Bank Details */}
                        <div className="mb-4 col-10">
                            <h5>Bank Details</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Card Number</th>
                                        <th>Card Type</th>
                                        <th>Currency</th>
                                        <th>IBAN</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.bank && userDetails.bank.length > 0 ? (
                                        userDetails.bank.map((bank) => (
                                            <tr key={bank.id}>
                                                <td>{bank.card_number}</td>
                                                <td>{bank.card_type}</td>
                                                <td>{bank.currency}</td>
                                                <td>{bank.iban}</td>
                                                <td>
                                                    <Link
                                                        to={'/update_user_bank'}
                                                        className="btn btn-warning btn-sm me-2"
                                                        state={{userId:userId, bankDetails:bank}}
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm me-2"
                                                        onClick={()=>DeleteBank(userId, bank.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No bank details available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Link
                                className="btn btn-success mt-3"
                                to={'/add_bank'}
                                state={{userId:userId}}
                            >
                                <FaPlus /> Add Bank Detail
                            </Link>
                        </div>

                        <hr />

                        {/* Company Details */}
                        <div className="mb-4 col-10">
                            <h5>Company Details</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Company Name</th>
                                        <th>Title</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.company && userDetails.company.length > 0 ? (
                                        userDetails.company.map((company) => (
                                            <tr key={company.id}>
                                                <td>{company.department}</td>
                                                <td>{company.name}</td>
                                                <td>{company.title}</td>
                                                <td>
                                                    <Link
                                                        to={'/update_user_company'}
                                                        className="btn btn-warning btn-sm me-2"
                                                        state={{userId:userId, userCompany:company}}
                                                    >
                                                        
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm me-2"
                                                        onClick={()=>DeleteCompany(userId,company.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No company details available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Link
                                to={'/add_company'}
                                className="btn btn-success mt-3"
                                state={{userId:userId}}
                            >
                                <FaPlus /> Add Company Detail
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Complete_Details;
