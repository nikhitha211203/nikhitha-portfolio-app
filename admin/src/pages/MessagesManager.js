import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesManager = () => {
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
    <div className="manager-container animate-fade-in">
      <h2 className="mb-4 text-gradient">Messages</h2>
      {error && <div className="glass-card p-3 mb-3 text-danger text-center">{error}</div>}

      <div className="item-list">
        {messages.length === 0 && <p className="text-muted text-center mt-5">No messages found.</p>}
        {messages.map(msg => (
          <div key={msg._id} className={`glass-card p-4 mb-3 ${msg.isRead ? 'opacity-75' : 'border-primary'}`}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{msg.name}</h5>
                <p className="text-primary mb-1">{msg.email}</p>
                <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
              <div>
                {!msg.isRead && <button onClick={() => markAsRead(msg._id)} className="login-btn py-2 px-3 me-2" style={{ width: 'auto', fontSize: '0.8rem' }}>Mark Read</button>}
                <button onClick={() => handleDelete(msg._id)} className="btn-danger me-2">Delete</button>
                <button onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)} className="btn-edit">{expandedId === msg._id ? 'Hide' : 'View'}</button>
              </div>
            </div>

            {expandedId === msg._id && (
              <div className="mt-3 p-3" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <p className="mb-0 text-light">{msg.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesManager;
