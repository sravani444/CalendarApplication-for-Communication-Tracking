import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button className="dashboard-button">
          <Link to="/admin/companies" className="dashboard-link">
            Manage Companies
          </Link>
        </button>
        <button className="dashboard-button">
          <Link to="/admin/communication-method/add" className="dashboard-link">
            Manage Communication Methods
          </Link>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
