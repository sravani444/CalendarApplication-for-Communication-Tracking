// CompanyList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    let savedCompanies = JSON.parse(localStorage.getItem('companies')) || [];

    if (savedCompanies.length === 0) {
      const defaultCompany = {
        id: Date.now().toString(),
        name: 'Accenture',
        location: 'Location',
        linkedIn: 'https://www.linkedin.com/company/accenture',
        email: 'contact@accenture.com',
        phoneNumber: '123-456-7890',
        comment: 'Global consulting firm',
        communicationPeriodicity: 'Quarterly',
      };

      savedCompanies = [defaultCompany];
      localStorage.setItem('companies', JSON.stringify(savedCompanies));
    }

    setCompanies(savedCompanies);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      const updatedCompanies = companies.filter(company => company.id !== id);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setCompanies(updatedCompanies);
    }
  };

  return (
    <div className="company-list-container">
      {/* Add New Company Button placed at the top */}
      <Link to="/admin/company/add" className="add-new-company-btn">
        Add New Company
      </Link>

      <h2>Company List:</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <strong>{company.name}</strong> - {company.location} <br />
            LinkedIn: <a href={company.linkedIn} target="_blank" rel="noopener noreferrer">{company.linkedIn}</a><br />
            Email: <a href={`mailto:${company.email}`} target="_blank" rel="noopener noreferrer">{company.email}</a><br />
            Phone: {company.phoneNumber}<br />
            Comment: {company.comment}<br />
            Communication Periodicity: {company.communicationPeriodicity}<br />
            <button className="edit-btn">
              <Link to={`/admin/company/edit/${company.id}`} style={{ color: 'white', textDecoration: 'none' }}>Edit</Link>
            </button>
            <button className="delete-btn" onClick={() => handleDelete(company.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
