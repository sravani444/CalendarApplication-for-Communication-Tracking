import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation'; // Default import
import AdminDashboard from './components/AdminDashboard'; // Default import
import UserDashboard from './components/UserDashboard'; // Default import
import CalendarView from './components/CalendarView'; // Default import
import CompanyList from './components/CompanyList'; // Default import
//import CommunicationMethodsList from './components/CommunicationMethodsList'; // Default import
import AddEditCompany from './components/AddEditCompany'; // Default import
import AddEditCommunicationMethod from './components/AddEditCommunicationMethod'; // Default import

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navigation />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<CompanyList />} />
        <Route path="/admin/company/add" element={<AddEditCompany />} />
        <Route path="/admin/company/list" element={<CompanyList />} />
        <Route path="/admin/company/edit" element={<AddEditCompany />} />
        <Route path="/admin/company/edit/:id" element={<AddEditCompany />} />
        <Route path="/admin/communication-method/add" element={<AddEditCommunicationMethod />} />
        <Route path="/admin/communication-method/edit/:id" element={<AddEditCommunicationMethod />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
