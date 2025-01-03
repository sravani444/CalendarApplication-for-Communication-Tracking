import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';

function AddEditCompany() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');
  const [communicationPeriodicity, setCommunicationPeriodicity] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // This hook loads company data on component mount
  useEffect(() => {
    if (id) {
      const companies = JSON.parse(localStorage.getItem('companies')) || [];
      const companyToEdit = companies.find((company) => company.id === id);
      if (companyToEdit) {
        setName(companyToEdit.name);
        setLocation(companyToEdit.location);
        setLinkedIn(companyToEdit.linkedIn);
        setEmail(companyToEdit.email);
        setPhoneNumber(companyToEdit.phoneNumber);
        setComment(companyToEdit.comment);
        setCommunicationPeriodicity(companyToEdit.communicationPeriodicity);
      }
    }
  }, [id]);

  // This hook handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = {
      id: id || Date.now().toString(),
      name,
      location,
      linkedIn,
      email,
      phoneNumber,
      comment,
      communicationPeriodicity,
    };

    const companies = JSON.parse(localStorage.getItem('companies')) || [];

    if (id) {
      const updatedCompanies = companies.map((company) =>
        company.id === id ? newCompany : company
      );
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    } else {
      localStorage.setItem('companies', JSON.stringify([...companies, newCompany]));
    }

    // Reset form data after submission
    setName('');
    setLocation('');
    setLinkedIn('');
    setEmail('');
    setPhoneNumber('');
    setComment('');
    setCommunicationPeriodicity('');

    // Navigate to companies list page after saving
    navigate('/admin/companies');
  };

  return (
    <div className="add-edit-company-container">
      <h2>{id ? 'Edit Company' : 'Add Company'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>LinkedIn Profile</label>
        <input
          type="text"
          placeholder="LinkedIn Profile"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label>Comments</label>
        <input
          type="text"
          placeholder="Comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label>Communication Periodicity</label>
        <input
          type="text"
          placeholder="Communication Periodicity"
          value={communicationPeriodicity}
          onChange={(e) => setCommunicationPeriodicity(e.target.value)}
          required
        />

        <button type="submit">{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default AddEditCompany;
