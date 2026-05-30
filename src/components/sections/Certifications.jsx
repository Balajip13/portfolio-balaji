import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import certificationsData from '../../data/certifications.json';
import './Certifications.css';

const Certifications = () => {
  return (
    <section className="certifications-section" id="certifications">
      <SectionBootLabel moduleName="CERTIFICATIONS" />
      <FloatingIcons count={6} sectionId="certifications" />
      <div className="container certifications-container">
        <h2 className="certifications-title">Certifications</h2>
        <div className="cert-grid">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="cert-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="cert-icon">
                <FiAward size={24} />
              </div>
              <div className="cert-body">
                <h3 className="cert-name">{cert.title}</h3>
                <p className="cert-issuer mono">{cert.issuer}</p>
                {cert.year && (
                  <span className="cert-year mono">{cert.year}</span>
                )}
                {cert.certificateUrl ? (
                  <a 
                    href={cert.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cert-link-btn mono"
                  >
                    <FiExternalLink /> View Certificate
                  </a>
                ) : (
                  <span className="cert-link-btn disabled mono">
                    Certificate Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
