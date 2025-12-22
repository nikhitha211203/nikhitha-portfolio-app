import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MessagesManager = ({ setToken }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

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
    <div>
      <Navbar setToken={setToken} />
      <div className="manager-container">
        <h2>Messages</h2>
        {error && <p className="error-msg">{error}</p>}
        <div className="item-list">
          {messages.length === 0 && <p>No messages found.</p>}
          {messages.map(msg => (
            <div key={msg._id} className="item-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{msg.name}</strong> <span>— {msg.email}</span>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(msg.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  {!msg.isRead && <button onClick={() => markAsRead(msg._id)} className="btn-primary">Mark as Read</button>}
                  <button onClick={() => handleDelete(msg._id)} className="btn-danger">Delete</button>
                  <button onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)} style={{ marginLeft: '8px' }} className="btn-secondary">{expandedId === msg._id ? 'Hide' : 'View'}</button>
                </div>
              </div>

              {expandedId === msg._id && (
                <div style={{ marginTop: '1rem' }}>
                  <p>{msg.message}</p>
                </div>
              )}

              {msg.isRead && <div style={{ marginTop: '0.5rem', color: 'green' }}><small>Read</small></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;
