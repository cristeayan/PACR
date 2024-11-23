import React, { useState } from 'react';

const Modal = ({ title, data, onSave, onClose }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('contact.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', width: '400px' }}>
      <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>×</button>
      <h3>{title}</h3>

      {/* Form Fields */}
      <div style={{ marginTop: '20px' }}>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <textarea
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Headline"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          name="contact.phone"
          value={formData.contact.phone}
          onChange={handleChange}
          placeholder="Phone"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          name="contact.email"
          value={formData.contact.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          name="contact.website"
          value={formData.contact.website}
          onChange={handleChange}
          placeholder="Website"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
      </div>

      {/* Save and Cancel Buttons */}
      <div style={{ textAlign: 'right' }}>
        <button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
        <button onClick={() => onSave(formData)}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
