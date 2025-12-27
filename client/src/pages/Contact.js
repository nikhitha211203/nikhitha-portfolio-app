import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setStatusType("info");
    try {
      await axios.post("https://nikhitha-portfolio-app.onrender.com/", formData);
      setStatus("Message sent successfully! I'll get back to you soon.");
      setStatusType("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error sending message. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div className="contact-container py-5 mt-5 d-flex align-items-center">
      <div className="container">
        <h2 className="text-center mb-5 display-5 fw-bold">Get In <span className="text-gradient">Touch</span></h2>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="glass-card p-5 animate-fade-in">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label text-light opacity-75">Name</label>
                  <input
                    name="name"
                    className="form-control form-control-dark"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light opacity-75">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-dark"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light opacity-75">Message</label>
                  <textarea
                    name="message"
                    className="form-control form-control-dark"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-premium w-100 py-3">
                  Send Message <i className="bi bi-send-fill ms-2"></i>
                </button>

                {status && (
                  <div className={`mt-4 alert alert-${statusType === 'error' ? 'danger' : statusType === 'success' ? 'success' : 'info'} text-center`} role="alert">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
