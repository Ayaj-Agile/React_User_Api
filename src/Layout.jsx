import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom"; // For rendering the active route's component
import "./layout.css"; // Import the layout.css file
import { useState } from "react";


const Layout = () => {

  // Add state for the background color
  const [isLight, setIsDark] = useState(false); 

  // Function to toggle the color
  const handleToggleColor = (status) => {
    setIsDark(status);
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <nav className={`navbar ${isLight ? 'navbar-light bg-primary' : 'navbar-dark bg-dark'} px-3`}>
        <a className="navbar-brand d-flex text-light align-items-center" href="#">
          <i className="bi bi-people me-2"></i> Users App
        </a>
        <button className={`btn ${isLight ? 'btn-outline-light' : ' btn-outline-light'}`}>Logout</button>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className={`p-3 ${isLight ? 'bg-primary-subtle':'bg-dark-subtle'}`} style={{ width: "250px" }}>
          <h5 className="text-dark">Menu</h5>
          <ul className="nav flex-column ">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link inactive-link "
                }
                to="/"
              >
                <i className="bi bi-house-door me-2"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link inactive-link"
                }
                to="/users"
              >
                <i className="bi bi-person me-2"></i> Profiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link inactive-link"
                }
                to="/settings"
              >
                <i className="bi bi-gear me-2"></i> Settings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <Outlet context={{ handleToggleColor }}/> {/* This renders the current route's component */}
        </div>
      </div>

      {/* Footer */}
      <footer className={`text-center py-2 text-light  ${isLight ? 'bg-primary' : 'bg-dark'} `}>
        &copy; {new Date().getFullYear()} Users App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
