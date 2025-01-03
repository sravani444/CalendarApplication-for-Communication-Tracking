import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'; // Import the CSS file

function AddEditCommunicationMethod() {
  const [methods, setMethods] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sequence, setSequence] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();  // To handle editing specific methods

  useEffect(() => {
    const defaultMethods = [
      { id: 1, name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
      { id: 2, name: 'LinkedIn Message', description: 'Send message on LinkedIn', sequence: 2, mandatory: true },
      { id: 3, name: 'Email', description: 'Send an email', sequence: 3, mandatory: false },
      { id: 4, name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
      { id: 5, name: 'Other', description: 'Other method of communication', sequence: 5, mandatory: false }
    ];

    const savedMethods = localStorage.getItem('communicationMethods');
    if (savedMethods) {
      setMethods(JSON.parse(savedMethods));
    } else {
      setMethods(defaultMethods);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const methodToEdit = methods.find(method => method.id === parseInt(id));
      if (methodToEdit) {
        setName(methodToEdit.name);
        setDescription(methodToEdit.description);
        setSequence(methodToEdit.sequence);
        setMandatory(methodToEdit.mandatory);
      }
    }
  }, [id, methods]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMethod = { id: id ? parseInt(id) : methods.length + 1, name, description, sequence, mandatory };

    let updatedMethods;
    if (id) {
      updatedMethods = methods.map((method) =>
        method.id === newMethod.id ? newMethod : method
      );
    } else {
      updatedMethods = [...methods, newMethod];
    }

    setMethods(updatedMethods);
    localStorage.setItem('communicationMethods', JSON.stringify(updatedMethods));

    navigate('/admin/communication-methods');
  };

  const handleDelete = (methodId) => {
    const updatedMethods = methods.filter(method => method.id !== methodId);
    setMethods(updatedMethods);
    localStorage.setItem('communicationMethods', JSON.stringify(updatedMethods));
  };

  return (
    <div className="add-edit-container">
      <h2>{id ? 'Edit' : 'Add New'} Communication Method</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sequence:</label>
          <input
            type="number"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mandatory:</label>
          <input
            type="checkbox"
            checked={mandatory}
            onChange={() => setMandatory(!mandatory)}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Save'}</button>
      </form>

      <div className="methods-list">
        <h3>Existing Communication Methods:</h3>
        <ul>
          {methods.map((method) => (
            <li key={method.id}>
              <strong>{method.name}</strong> - {method.description}
              <div>Sequence: {method.sequence}</div>
              <div>Mandatory: {method.mandatory ? 'Yes' : 'No'}</div>
              <button onClick={() => navigate(`/admin/communication-method/edit/${method.id}`)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(method.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddEditCommunicationMethod;
