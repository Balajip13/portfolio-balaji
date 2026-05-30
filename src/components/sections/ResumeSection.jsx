import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiExternalLink, FiDownload } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import './ResumeSection.css';

const ResumeSection = () => {
  const resumeUrl = "/Resume_Balaji_P.pdf";

  return (
    <section className="resume-section" id="resume">
      <SectionBootLabel moduleName="RESUME_DATA" />
      <FloatingIcons count={6} sectionId="resume" />
      <div className="container">
        <div className="resume-split">
          <h2 className="section-title resume-title">Resume</h2>
          <motion.div 
            className="resume-preview-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div className="resume-build-effect mono" aria-hidden="true">
              <div>&gt; resume.exe</div>
              <div className="fade-delay-1">Loading...</div>
              <div className="fade-delay-2">████████ 100%</div>
              <div className="fade-delay-3 status-ready">READY</div>
            </div>
            <div className="resume-glass-card">
              <div className="resume-card-header">
                <div className="pdf-icon-wrapper">
                  <FiFileText />
                  <span className="pdf-filename mono">Balaji_P_Resume.pdf</span>
                </div>
                <span className="page-count mono">1 Page</span>
              </div>
              
              <div className="doc-preview-lines">
                <div className="doc-line title"></div>
                <div className="doc-line full"></div>
                <div className="doc-line full"></div>
                <div className="doc-line med"></div>
                <div style={{ height: '0.5rem' }}></div>
                <div className="doc-line title" style={{ width: '25%' }}></div>
                <div className="doc-line full"></div>
                <div className="doc-line med"></div>
                <div className="doc-line short"></div>
              </div>

              <p className="resume-description">
                Professional resume showcasing technical skills, experience, education, and projects.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="resume-actions-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="resume-action-text mono">
              Access my full professional history and technical qualifications.
            </p>

            <div className="resume-meta-grid">
              <div className="meta-item">
                <span className="meta-indicator"></span>
                <span className="meta-text mono">MCA GRADUATE</span>
              </div>
              <div className="meta-item">
                <span className="meta-indicator"></span>
                <span className="meta-text mono">OPEN TO WORK</span>
              </div>
              <div className="meta-item">
                <span className="meta-indicator"></span>
                <span className="meta-text mono">UPDATED 2026</span>
              </div>
              <div className="meta-item">
                <span className="meta-indicator"></span>
                <span className="meta-text mono">AVAILABLE FOR OPPORTUNITIES</span>
              </div>
            </div>
            <div className="resume-buttons">
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resume-btn"
              >
                <FiExternalLink size={20} />
                VIEW_RESUME
              </a>
              <a 
                href={resumeUrl} 
                download="Balaji_P_Resume.pdf"
                className="resume-btn secondary"
              >
                <FiDownload size={20} />
                DOWNLOAD_RESUME
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
