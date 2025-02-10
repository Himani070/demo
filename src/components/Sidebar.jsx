import React from "react";
import { Link } from "react-router-dom";  // Keep only one import
import "../styles/global.css";

function Sidebar() {
  return (
    
    <div className="sidebar">
      <div className="sidebar-header"><h2>Navigation</h2></div>
      <Link to="/">
        <img src="public/icons/Home.png" alt="Home" />
        Home
      </Link>
      <Link to="/">
        <img src="public/icons/vehicle_reg.png" alt="Vehicle Registration" />
        Vehicle Registration
      </Link>
      <Link to="/">
        <img src="public/icons/update.png" alt="Vehicle Update" />
        Vehicle Update
      </Link>
      <Link to="/">
        <img src="public/icons/prediction.png" alt="Predict Results" />
        Predict Results
      </Link>
      <Link to="/">
        <img src="public/icons/report.png" alt="Report" />
        Report
      </Link>

      <div className="sidebar-footer">
      <Link to="/">
        <img src="public/icons/logout.png" alt="Logout" />
        Logout
      </Link>
      </div>

    </div>

      
  );
}

export default Sidebar;