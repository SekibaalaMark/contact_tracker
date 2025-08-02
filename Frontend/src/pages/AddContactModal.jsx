import React, { useState } from 'react';
import './AddContactModal.css';

const AddContactModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    number: '',
    first_name: '',
    last_name: '',
    village: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.number.trim()) {
      newErrors.number = 'Number is required';
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.village.trim()) {
      newErrors.village = 'Village is required';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://contact-tracker-zy9f.onrender.com/api/add-child/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Contact added successfully
        console.log('Contact added successfully:', data);
        onSuccess();
      } else {
        // Failed to add contact
        console.error('Failed to add contact:', data);
        
        // Handle different types of errors
        if (data.number) {
          setErrors({ number: data.number[0] });
        } else if (data.first_name) {
          setErrors({ first_name: data.first_name[0] });
        } else if (data.last_name) {
          setErrors({ last_name: data.last_name[0] });
        } else if (data.village) {
          setErrors({ village: data.village[0] });
        } else if (data.contact) {
          setErrors({ contact: data.contact[0] });
        } else if (data.non_field_errors) {
          setErrors({ general: data.non_field_errors[0] });
        } else {
          setErrors({ general: 'Failed to add contact. Please try again.' });
        }
      }
      
    } catch (error) {
      console.error('Error adding contact:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Contact</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className={errors.number ? 'error' : ''}
                placeholder="Enter number"
                disabled={isLoading}
              />
              {errors.number && <span className="error-text">{errors.number}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={errors.contact ? 'error' : ''}
                placeholder="Enter contact"
                disabled={isLoading}
              />
              {errors.contact && <span className="error-text">{errors.contact}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'error' : ''}
                placeholder="Enter first name"
                disabled={isLoading}
              />
              {errors.first_name && <span className="error-text">{errors.first_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'error' : ''}
                placeholder="Enter last name"
                disabled={isLoading}
              />
              {errors.last_name && <span className="error-text">{errors.last_name}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="village">Village</label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className={errors.village ? 'error' : ''}
              placeholder="Enter village"
              disabled={isLoading}
            />
            {errors.village && <span className="error-text">{errors.village}</span>}
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal; 