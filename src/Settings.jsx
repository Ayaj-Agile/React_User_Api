import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
   // Initialize the toggle state based on localStorage, default to true
   const [isToggled, setIsToggled] = useState(() => {
    const savedState = sessionStorage.getItem("toggleState");
    return savedState !== null ? JSON.parse(savedState) : true; // Default to enabled
  });

  // Get handleToggleColor function from the Layout component
  const { handleToggleColor } = useOutletContext();

  // Update localStorage and Layout when toggle state changes
  const handleToggle = () => {
    const newStatus = !isToggled;
    setIsToggled(newStatus);
    handleToggleColor(newStatus);
    sessionStorage.setItem("toggleState", JSON.stringify(newStatus)); // Save the state
  };
  return (
    <div className="flex-grow-1 p-3">
      <h2>Settings</h2>
      <p>This is the settings section of the Users.</p>
      
      {/* Toggle Button */}
      <div className="mb-3">
        <label className="form-label">Change Color</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="toggleSwitch"
            checked={isToggled}
            onChange={handleToggle}
          />
          <label className="form-check-label" htmlFor="toggleSwitch">
            {isToggled ? "Enabled" : "Disabled"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
