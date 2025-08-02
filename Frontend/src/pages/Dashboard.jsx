import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import AddContactModal from './AddContactModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("userData");
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const handleAddContact = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleContactAdded = () => {
    setShowAddModal(false);
    // TODO: Refresh contact data or show success message
    console.log('Contact added successfully!');
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Contact Tracker Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username || 'User'}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-section">
            <h2>Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📞</div>
                <div className="stat-info">
                  <h3>Total Contacts</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Favorites</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>Recent</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn primary" onClick={handleAddContact}>
                <span className="action-icon">➕</span>
                <span>Add New Contact</span>
              </button>
              <button className="action-btn secondary">
                <span className="action-icon">🔍</span>
                <span>Search Contacts</span>
              </button>
              <button className="action-btn secondary">
                <span className="action-icon">📋</span>
                <span>View All Contacts</span>
              </button>
              <button className="action-btn secondary">
                <span className="action-icon">⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Recent Contacts Section */}
          <div className="recent-section">
            <h2>Recent Contacts</h2>
            <div className="recent-content">
              <p className="empty-state">No contacts yet. Start by adding your first contact!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Contact Modal */}
      {showAddModal && (
        <AddContactModal
          onClose={handleCloseModal}
          onSuccess={handleContactAdded}
        />
      )}
    </div>
  );
};

export default Dashboard; 