import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const initialCompanies = [
  {
    id: uuidv4(),
    name: 'TechCorp',
    communications: [
      { id: uuidv4(), type: 'Email', date: '2024-12-01', notes: 'Product Launch Email' },
      { id: uuidv4(), type: 'Call', date: '2024-11-25', notes: 'Follow-up on proposal' },
      { id: uuidv4(), type: 'Meeting', date: '2024-11-15', notes: 'Strategic meeting' },
      { id: uuidv4(), type: 'Email', date: '2024-10-30', notes: 'Quarterly Review' },
      { id: uuidv4(), type: 'LinkedIn Post', date: '2024-10-20', notes: 'Marketing campaign update' },
    ],
    nextCommunication: { id: uuidv4(), type: 'Call', date: '2024-12-30' },
  },
  {
    id: uuidv4(),
    name: 'Innova Inc.',
    communications: [
      { id: uuidv4(), type: 'Email', date: '2024-12-05', notes: 'Initial contact email' },
      { id: uuidv4(), type: 'Call', date: '2024-11-28', notes: 'Product demonstration call' },
      { id: uuidv4(), type: 'Meeting', date: '2024-11-18', notes: 'Team collaboration session' },
      { id: uuidv4(), type: 'Email', date: '2024-10-25', notes: 'Follow-up on last meeting' },
      { id: uuidv4(), type: 'Call', date: '2024-10-15', notes: 'Client inquiry response' },
    ],
    nextCommunication: { id: uuidv4(), type: 'Email', date: '2024-12-29' },
  },
];

const NotificationIcon = ({ overdue, dueToday, onClick }) => {
  const totalNotifications = overdue + dueToday;
  return (
    <div className="notification-icon" onClick={onClick}>
      <i className="bell-icon">&#128276;</i>
      {totalNotifications > 0 && <span className="badge">{totalNotifications}</span>}
    </div>
  );
};

function UserDashboard() {
  const [companies, setCompanies] = useState([]);
  const [notifications, setNotifications] = useState({ overdue: 0, dueToday: 0 });
  const [communication, setCommunication] = useState({ type: '', date: '', notes: '' });
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const prevCompaniesRef = useRef();

  const highlightOverdueCommunications = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    let overdueCount = 0;
    let dueTodayCount = 0;

    const updatedCompanies = companies.map((company) => {
      const nextCommDate = new Date(company.nextCommunication?.date);  // Safe check using optional chaining
      const currentDate = new Date(today);
      const daysOverdue = nextCommDate ? Math.floor((currentDate - nextCommDate) / (1000 * 60 * 60 * 24)) : 0;  // Safeguard for undefined nextCommunication

      if (daysOverdue > 0) {
        company.highlight = 'red';
        overdueCount++;
        company.overdueDays = daysOverdue;
      } else if (daysOverdue === 0) {
        company.highlight = 'yellow';
        dueTodayCount++;
      } else {
        company.highlight = 'none';
      }

      return company;
    });

    if (!prevCompaniesRef.current || JSON.stringify(prevCompaniesRef.current) !== JSON.stringify(updatedCompanies)) {
      setCompanies(updatedCompanies);
      prevCompaniesRef.current = updatedCompanies;
    }

    setNotifications({ overdue: overdueCount, dueToday: dueTodayCount });
  }, [companies]);

  useEffect(() => {
    highlightOverdueCommunications();
  }, [highlightOverdueCommunications]);

  useEffect(() => {
    const savedCompanies = localStorage.getItem('companies-dashboard'); // Separate storage for UserDashboard
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    } else {
      setCompanies(initialCompanies);
    }
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      const companiesData = companies.map((company) => ({
        id: company.id,
        name: company.name,
        communications: company.communications ? company.communications.slice(0, 5) : [], // Safe access
        nextCommunication: company.nextCommunication,
      }));

      localStorage.setItem('companies-dashboard', JSON.stringify(companiesData)); // Separate storage for UserDashboard
    }
  }, [companies]);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies((prevSelectedCompanies) =>
      prevSelectedCompanies.includes(companyId)
        ? prevSelectedCompanies.filter((id) => id !== companyId)
        : [...prevSelectedCompanies, companyId]
    );
  };

  const handleSubmitCommunication = () => {
    if (communication.type && communication.date && communication.notes && selectedCompanies.length > 0) {
      const updatedCompanies = companies.map((company) => {
        if (selectedCompanies.includes(company.id)) {
          const newCommunication = { id: uuidv4(), ...communication };
          company.communications.push(newCommunication);
          company.communications.sort((a, b) => new Date(b.date) - new Date(a.date));
          company.nextCommunication = { id: uuidv4(), type: communication.type, date: communication.date };
          company.communications = company.communications.slice(0, 5);
        }
        return company;
      });

      setCompanies(updatedCompanies);
      localStorage.setItem('companies-dashboard', JSON.stringify(updatedCompanies));

      setCommunication({ type: '', date: '', notes: '' });
      setSelectedCompanies([]);
      closeModal();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Company Communication Dashboard</h2>
        <NotificationIcon
          overdue={notifications.overdue}
          dueToday={notifications.dueToday}
          onClick={handleNotificationClick}
        />
      </div>

      {showNotifications && (
        <div className="notifications-section">
          <h3>Notifications</h3>
          <div className="communications-grid">
            <h4>Overdue Communications</h4>
            {companies.filter((company) => company.highlight === 'red').map((company) => (
              <div key={company.id} className="company-row red">
                <span>{company.name}</span>
                <span>{company.nextCommunication?.date}</span>  {/* Safe access */}
                <span>{company.overdueDays} days overdue</span>
              </div>
            ))}
            <h4>Today's Communications</h4>
            {companies.filter((company) => company.highlight === 'yellow').length > 0 ? (
              companies.filter((company) => company.highlight === 'yellow').map((company) => (
                <div key={company.id} className="company-row yellow">
                  <span>{company.name}</span>
                  <span>{company.nextCommunication?.date}</span>
                </div>
              ))
            ) : (
              <div>No communications due today</div>
            )}
          </div>
        </div>
      )}

      <div className="companies-list">
        <div className="company-header">
          <span>Select</span>
          <span>Company Name</span>
          <span>Last Five Communications</span>
          <span>Next Scheduled Communication</span>
        </div>

        {companies.map((company) => (
          <div
            key={company.id}
            className={`company-row ${company.highlight} ${selectedCompanies.includes(company.id) ? 'selected' : ''}`}
            onClick={() => handleSelectCompany(company.id)}
          >
            <input
              type="checkbox"
              checked={selectedCompanies.includes(company.id)}
              onChange={() => handleSelectCompany(company.id)}
            />
            <span>{company.name}</span>
            <span className="communications-list">
              {(company.communications || []).slice(0, 5).map((communication) => (
                <div key={communication.id} className="communication-item">
                  <span>{communication.type} - {communication.date}</span>
                  <div className="tooltip">{communication.notes}</div>
                </div>
              ))}
            </span>
            <span>{company.nextCommunication?.type} - {company.nextCommunication?.date}</span>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={openModal} disabled={selectedCompanies.length === 0}>+ Communication Performed</button>
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Communication</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitCommunication(); }}>
              <label>
                Type:
                <input
                  type="text"
                  value={communication.type}
                  onChange={(e) => setCommunication({ ...communication, type: e.target.value })}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={communication.date}
                  onChange={(e) => setCommunication({ ...communication, date: e.target.value })}
                />
              </label>
              <label>
                Notes:
                <textarea
                  value={communication.notes}
                  onChange={(e) => setCommunication({ ...communication, notes: e.target.value })}
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
