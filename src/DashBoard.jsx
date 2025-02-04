import { Pie, Bar } from 'react-chartjs-2'; // Import Bar chart as well
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { FaUsers, FaMale, FaFemale } from 'react-icons/fa'; // Import icons from react-icons
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [youngUsers, setYoungUsers] = useState(0);
  const [oldUsers, setOldUsers] = useState(0);

  const [ageGroups, setAgeGroups] = useState({
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "56+": 0,
  });

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://django-api-i7xy.onrender.com/user_api/users/');
      setUsers(response.data.users); // Make sure response.data has a users field
    } catch (error) {
      console.log("Error Occurred: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      let total = 0;
      let young = 0;
      let old = 0;
      let ageGroupsTemp = {
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-55": 0,
        "56+": 0,
      };

      users.forEach((e) => {
        total += 1;
        const age = e.age; // assuming the 'age' field is available

        if (age >= 18 && age <= 25) {
          ageGroupsTemp["18-25"] += 1;
        } else if (age >= 26 && age <= 35) {
          ageGroupsTemp["26-35"] += 1;
        } else if (age >= 36 && age <= 45) {
          ageGroupsTemp["36-45"] += 1;
        } else if (age >= 46 && age <= 55) {
          ageGroupsTemp["46-55"] += 1;
        } else if (age >= 56) {
          ageGroupsTemp["56+"] += 1;
        }

        // Old and Young logic for other pie chart
        if (age > 35) {
          old += 1;
        } else {
          young += 1;
        }
      });

      setTotalUsers(total);
      setYoungUsers(young);
      setOldUsers(old);
      setAgeGroups(ageGroupsTemp);
    }
  }, [users]);

  // Data for Pie Chart (Young vs Old)
  const pieData = {
    labels: ['Young Users', 'Old Users'],
    datasets: [{
      data: [youngUsers, oldUsers],
      backgroundColor: ['#3B82F6', '#F43F5E'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 2,
    }],
  };

  // Data for Bar Chart (Age Group Distribution)
  const barData = {
    labels: Object.keys(ageGroups),
    datasets: [{
      label: 'Users per Age Group',
      data: Object.values(ageGroups),
      backgroundColor: '#3B82F6',
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  return (
    <div className="flex-grow-1 p-3">
      <h2>Welcome to Users App</h2>
      <p>This is the main content area.</p>

      <div className="row">
        <div className="col-12">
          {/* Set maxHeight and allow only vertical scrolling */}
          <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
            <div className="row">

              {/* Total Users Card */}
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-primary">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <FaUsers size={40} className="text-primary me-3" />
                      <div>
                        <h5 className="card-title">Total Users</h5>
                        <p className="card-text">{totalUsers} users</p>
                      </div>
                    </div>
                    <Link
                      to={'/users'}
                      className="btn btn-primary"
                    >View Details</Link>
                  </div>
                </div>
              </div>

              {/* Young Users Card */}
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-info">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <FaMale size={40} className="text-info me-3" />
                      <div>
                        <h5 className="card-title">Young Users</h5>
                        <p className="card-text">{youngUsers} users</p>
                      </div>
                    </div>
                    <Link
                      to={'/users'}
                      className="btn btn-primary"
                      state={{ state: 'young' }}
                    >View Details</Link>
                  </div>
                </div>
              </div>

              {/* Old Users Card */}
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-danger">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <FaFemale size={40} className="text-danger me-3" />
                      <div>
                        <h5 className="card-title">Old Users</h5>
                        <p className="card-text">{oldUsers} users</p>
                      </div>
                    </div>
                    <Link
                      to={'/users'}
                      className="btn btn-primary"
                      state={{ state: 'old' }}
                    >View Details</Link>
                  </div>
                </div>
              </div>

            </div>

            {/* User Growth Progress Bar */}
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="card shadow-sm border-secondary">
                  <div className="card-body">
                    <h5 className="card-title">User Growth</h5>
                    <p className="card-text">Growth over the last 6 months</p>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        75%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart for Young vs Old Users */}
            <div className="row">
              <div className="d-flex">
              <div className="col-4">
              <Pie data={pieData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  width: 800, // Set the width of the pie chart
                  height: 800, // Set the height of the pie chart
                }} />
              </div>
              <div className="col-8">
              <Bar data={barData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  width: 600, // Set the width of the bar chart
                  height: 400, // Set the height of the bar chart
                }} />
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
