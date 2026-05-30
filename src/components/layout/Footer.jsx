import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiExternalLink, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FloatingIcons from '../ui/FloatingIcons';
import { useData } from '../../context/DataContext';
import './Footer.css';

const Footer = () => {
  const { portfolioData } = useData();
  const { profile } = portfolioData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    { id: 'github', icon: <FiGithub />, url: profile.github, label: 'GitHub' },
    { id: 'linkedin', icon: <FiLinkedin />, url: profile.linkedin, label: 'LinkedIn' },
    { id: 'instagram', icon: <FiInstagram />, url: profile.instagram || '#', label: 'Instagram' },
    { id: 'mail', icon: <FiMail />, url: `mailto:${profile.email}`, label: 'Mail' }
  ];

  return (
    <footer className="footer-minimal">
      <FloatingIcons count={3} sectionId="footer" />



      <div className="footer-grid">
        <div className="footer-left">
          <div className="footer-logo mono">
            &lt; Balaji <Link to="/console-portal" className="secret-trigger">P</Link> <span className="cursor">/</span>&gt;
          </div>

          <p className="copyright mono">© {new Date().getFullYear()} {profile.name}</p>
          <p className="footer-built mono">Built with React + Vite</p>
          <button 
            className="legal-link mono" 
            onClick={() => setIsModalOpen(true)}
          >
            Privacy Policy
          </button>
        </div>

        <div className="footer-center">
          <div className="social-hub">
            {socialLinks.map((social) => (
              <a 
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-right-empty"></div>
      </div>

      {isModalOpen && (
        <div className="privacy-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="privacy-modal glass" onClick={e => e.stopPropagation()}>
            <h3 className="mono">&lt; PRIVACY POLICY /&gt;</h3>
            <ul className="mono">
              <li>This portfolio does not collect personal data.</li>
              <li>Contact form information is used only for communication purposes.</li>
              <li>No user information is shared with third parties.</li>
              <li>External links may redirect to third-party platforms.</li>
              <li>By using this portfolio, users agree to these terms.</li>
            </ul>
            <button className="close-modal btn-primary" onClick={() => setIsModalOpen(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
