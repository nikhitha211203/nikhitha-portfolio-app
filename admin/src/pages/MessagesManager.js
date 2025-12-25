import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Correct API URL logic for local development
  const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : (process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com');

  const fetchMessages = async () => {
    try {
      const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
      const res = await axios.get(`${API_URL}/api/contact`, config);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
      await axios.put(`${API_URL}/api/contact/${id}`, {}, config);
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error(err);
      setError('Error marking message as read');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
      await axios.delete(`${API_URL}/api/contact/${id}`, config);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting message');
    }
  };

  return (
    <div className="manager-container animate-fade-in">
      <h2 className="mb-4 text-gradient">Messages</h2>

      {error && <div className="glass-card p-3 mb-3 text-danger text-center">{error}</div>}

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-muted m-0">Recent Inquiries</h4>
            <span className="badge bg-secondary opacity-50">{messages.length} Total</span>
          </div>

          <div className="row g-4">
            {messages.map((msg) => (
              <div key={msg._id} className="col-lg-6">
                <div className={`glass-card p-4 h-100 d-flex flex-column ${msg.isRead ? 'opacity-75' : ''}`} style={{ borderTop: `4px solid ${msg.isRead ? 'gray' : 'var(--primary)'}` }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-white">{msg.name}</h5>
                    <small className="text-muted">{new Date(msg.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div className="mb-3">
                    <a href={`mailto:${msg.email}`} className="text-info text-decoration-none small d-flex align-items-center gap-2">
                      <i className="bi bi-envelope"></i> {msg.email}
                    </a>
                  </div>
                  <div className="p-3 rounded mb-3" style={{ background: 'rgba(255,255,255,0.05)', flex: 1 }}>
                    <p className="mb-0 text-light" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>"{msg.message}"</p>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-auto pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    {!msg.isRead && (
                      <button className="btn btn-sm btn-glass-primary text-primary border-primary bg-transparent" onClick={() => markAsRead(msg._id)}>
                        <i className="bi bi-check2-all me-1"></i> Mark Read
                      </button>
                    )}
                    <button className="btn btn-sm btn-glass-danger" onClick={() => handleDelete(msg._id)}>
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-center text-muted py-5 glass-card">
              <i className="bi bi-inbox display-4 mb-3 d-block opacity-25"></i>
              No messages received yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;
