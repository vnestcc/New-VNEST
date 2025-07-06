import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Clock, Users, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ onGoToLanding }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('abstracts');
  const [abstracts, setAbstracts] = useState([]);
  const [details, setDetails] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [abstractsData, detailsData, pitchesData, usersData] = await Promise.all([
        adminService.getAllAbstracts(),
        adminService.getAllDetails(),
        adminService.getAllPitches(),
        adminService.getAllUsers()
      ]);
      
      setAbstracts(abstractsData.abstracts || []);
      setDetails(detailsData.details || []);
      setPitches(pitchesData.pitches || []);
      setUsers(usersData.users || []);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (type, id, status) => {
    setLoading(true);
    try {
      switch (type) {
        case 'abstract':
          await adminService.updateAbstractStatus(id, status);
          break;
        case 'details':
          await adminService.updateDetailsStatus(id, status);
          break;
        case 'pitch':
          await adminService.updatePitchStatus(id, status);
          break;
        default:
          throw new Error('Invalid update type');
      }
      
      // Refresh data after update
      await fetchData();
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onGoToLanding();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'abstracts', label: 'Abstracts', icon: <FileText size={20} />, count: abstracts.length },
    { id: 'details', label: 'Details', icon: <Users size={20} />, count: details.length },
    { id: 'pitches', label: 'Pitches', icon: <Calendar size={20} />, count: pitches.length },
    { id: 'users', label: 'Users', icon: <Users size={20} />, count: users.length }
  ];

  const renderAbstracts = () => (
    <div className="data-grid">
      {abstracts.map((abstract) => (
        <div key={abstract.id} className="data-card">
          <div className="card-header">
            <h3>Abstract #{abstract.id}</h3>
            <div className="status-badge">
              {getStatusIcon(abstract.status)}
              <span className={getStatusColor(abstract.status)}>
                {abstract.status.charAt(0).toUpperCase() + abstract.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="card-content">
            <p><strong>User:</strong> {abstract.name} ({abstract.email})</p>
            <p><strong>Submitted:</strong> {new Date(abstract.created_at).toLocaleDateString()}</p>
            <div className="abstract-text">
              <p><strong>Abstract:</strong></p>
              <p>{abstract.abstract}</p>
            </div>
          </div>
          
          {abstract.status === 'pending' && (
            <div className="card-actions">
              <button
                className="btn-approve"
                onClick={() => handleStatusUpdate('abstract', abstract.id, 'approved')}
                disabled={loading}
              >
                Approve
              </button>
              <button
                className="btn-reject"
                onClick={() => handleStatusUpdate('abstract', abstract.id, 'rejected')}
                disabled={loading}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderDetails = () => (
    <div className="data-grid">
      {details.map((detail) => (
        <div key={detail.id} className="data-card">
          <div className="card-header">
            <h3>Business Plan #{detail.id}</h3>
            <div className="status-badge">
              {getStatusIcon(detail.status)}
              <span className={getStatusColor(detail.status)}>
                {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="card-content">
            <p><strong>User:</strong> {detail.name} ({detail.email})</p>
            <p><strong>Submitted:</strong> {new Date(detail.created_at).toLocaleDateString()}</p>
            {detail.documents_url && (
              <p><strong>Documents:</strong> <a href={detail.documents_url} target="_blank" rel="noopener noreferrer">View Documents</a></p>
            )}
            <div className="description-text">
              <p><strong>Business Description:</strong></p>
              <p>{detail.full_description}</p>
            </div>
          </div>
          
          {detail.status === 'pending' && (
            <div className="card-actions">
              <button
                className="btn-approve"
                onClick={() => handleStatusUpdate('details', detail.id, 'approved')}
                disabled={loading}
              >
                Approve
              </button>
              <button
                className="btn-reject"
                onClick={() => handleStatusUpdate('details', detail.id, 'rejected')}
                disabled={loading}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderPitches = () => (
    <div className="data-grid">
      {pitches.map((pitch) => (
        <div key={pitch.id} className="data-card">
          <div className="card-header">
            <h3>Pitch #{pitch.id}</h3>
            <div className="status-badge">
              {getStatusIcon(pitch.status)}
              <span className={getStatusColor(pitch.status)}>
                {pitch.status.charAt(0).toUpperCase() + pitch.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="card-content">
            <p><strong>User:</strong> {pitch.name} ({pitch.email})</p>
            <p><strong>Scheduled:</strong> {new Date(pitch.scheduled_date).toLocaleString()}</p>
            {pitch.notes && (
              <div className="notes-text">
                <p><strong>Notes:</strong></p>
                <p>{pitch.notes}</p>
              </div>
            )}
          </div>
          
          {pitch.status === 'scheduled' && (
            <div className="card-actions">
              <button
                className="btn-approve"
                onClick={() => handleStatusUpdate('pitch', pitch.id, 'completed')}
                disabled={loading}
              >
                Mark Completed
              </button>
              <button
                className="btn-reject"
                onClick={() => handleStatusUpdate('pitch', pitch.id, 'cancelled')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderUsers = () => (
    <div className="data-grid">
      {users.filter(u => u.role !== 'admin').map((userItem) => (
        <div key={userItem.id} className="data-card">
          <div className="card-header">
            <h3>{userItem.name}</h3>
            <div className="role-badge">
              {userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
            </div>
          </div>
          
          <div className="card-content">
            <p><strong>Email:</strong> {userItem.email}</p>
            <p><strong>Joined:</strong> {new Date(userItem.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'abstracts':
        return abstracts.length > 0 ? renderAbstracts() : <div className="empty-state">No abstracts submitted yet.</div>;
      case 'details':
        return details.length > 0 ? renderDetails() : <div className="empty-state">No business plans submitted yet.</div>;
      case 'pitches':
        return pitches.length > 0 ? renderPitches() : <div className="empty-state">No pitches scheduled yet.</div>;
      case 'users':
        return users.length > 0 ? renderUsers() : <div className="empty-state">No users registered yet.</div>;
      default:
        return null;
    }
  };

  if (loading && !abstracts.length && !details.length && !pitches.length && !users.length) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-content">
          <button 
            className="back-to-home"
            onClick={onGoToLanding}
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>
          <div className="admin-info">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.name} - Manage applications and users</p>
          </div>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        <div className="tabs-container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="tab-content">
          {loading && <div className="loading-overlay">Loading...</div>}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
