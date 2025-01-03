import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import custom styles for navigation

function Navigation() {
  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-left-text">ENTNT</div>  {/* Added ENTNT text */}
        <h1>COMMUNICATION TRACKING</h1>
      </div>
      
      {/* Sidebar Navigation */}
      <nav>
        <ul>
          <li><Link to="/admin">Admin Dashboard</Link></li>
          <li><Link to="/user">User Dashboard</Link></li>
          <li><Link to="/calendar">Calendar View</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
