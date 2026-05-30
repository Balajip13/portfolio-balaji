import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import { useData } from '../../context/DataContext';
import './Contact.css';

const Contact = () => {
  const { portfolioData } = useData();
  const { profile } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation & trimming
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 6000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section className="contact-redesign" id="contact">
      <SectionBootLabel moduleName="CONTACT_PROTOCOLS" />
      <FloatingIcons count={7} sectionId="contact" />
      <div className="container">
        <div className="contact-card">
          <div className="contact-split-layout">
          <motion.div 
            className="contact-text-side"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-redesign">Get In Touch</h2>
            <p className="contact-mini-desc mono">Have a question or a project in mind? Let's connect.</p>

            <div className="contact-info-group">
              <h3 className="connect-heading mono">Connect With Me</h3>
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FiMail className="c-icon" />
                </div>
                <div className="contact-item-text">

                  <a href={`mailto:${profile.email}`} className="value mono link-effect">{profile.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FiGithub className="c-icon" />
                </div>
                <div className="contact-item-text">

                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="value mono link-effect">{profile.github.replace('https://', '')}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FiLinkedin className="c-icon" />
                </div>
                <div className="contact-item-text">

                  <a href="https://www.linkedin.com/in/balaji-p1/" target="_blank" rel="noopener noreferrer" className="value mono link-effect">linkedin.com/in/balaji-p1/</a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-side-redesign glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="contact-form-redesign">
              <div className="form-group-redesign">
                <label className="mono">NAME</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  placeholder="Enter your name"
                  className="glass" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group-redesign">
                <label className="mono">EMAIL</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="Enter your email"
                  className="glass" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group-redesign">
                <label className="mono">MESSAGE</label>
                <textarea 
                  name="message"
                  rows="5" 
                  required 
                  placeholder="Tell me more about your project..."
                  className="glass"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary send-btn ${status === 'sending' ? 'loading' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'} <FiSend />
              </button>
              
              {status === 'success' && (
                <div className="status-msg success mono" style={{ marginTop: '1.5rem', color: '#00ffcc', fontSize: '1.1rem', fontWeight: '500' }}>
                  <p>Message sent successfully</p>
                </div>
              )}
              {status === 'error' && (
                <div className="status-msg error mono" style={{ marginTop: '1.5rem', color: '#ff4a4a' }}>
                  <p>Unable to send message</p>
                </div>
              )}
            </form>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
