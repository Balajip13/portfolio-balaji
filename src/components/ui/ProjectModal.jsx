import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import './ProjectModal.css';

const Section = ({ title, children }) => (
  <div className="pm-section">
    <h3 className="pm-section-title mono">
      {title}
      <span className="pm-divider">--------------------</span>
    </h3>
    {children}
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const filename = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.exe';

  return (
    <div className="pm-overlay" onClick={onClose}>
      <motion.div
        className="pm-container glass"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="pm-header">
          <div className="pm-mac-dots">
            <span className="dot close" onClick={onClose}></span>
            <span className="dot minimize"></span>
            <span className="dot maximize"></span>
          </div>
          <span className="pm-filename mono">{filename}</span>
          <button className="pm-close-btn" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>

        {/* Project Title Banner */}
        <div className="pm-title-bar">
          <h2 className="pm-title">{project.title}</h2>
        </div>

        {/* Body */}
        <div className="pm-body">

          <Section title="OVERVIEW">
            <p className="pm-text">{project.overview}</p>
          </Section>

          <Section title="CHALLENGE">
            <p className="pm-text">{project.challenge}</p>
          </Section>

          <Section title="SOLUTION">
            <p className="pm-text">{project.solution}</p>
          </Section>

          <Section title="KEY FEATURES">
            <ul className="pm-list">
              {project.modalFeatures?.map((feature, i) => (
                <li key={i}><span className="pm-bullet">•</span> {feature}</li>
              ))}
            </ul>
          </Section>

          <div className="pm-grid-2">
            <Section title="TECH STACK">
              <div className="pm-tags">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="pm-tag mono">[{tech}]</span>
                ))}
              </div>
            </Section>

            <Section title="PROJECT TYPE">
              <p className="pm-text">{project.projectType}</p>
            </Section>
          </div>

          <Section title="STATUS">
            <p className="pm-text pm-status">
              <span className="pm-status-dot"></span> {project.status}
            </p>
          </Section>

          <Section title="ACTIONS">
            <div className="pm-actions">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-action-btn primary mono"
                >
                  <FiExternalLink /> [ LIVE DEMO ]
                </a>
              )}
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-action-btn secondary mono"
                  title="View Source Code"
                >
                  <FiGithub /> [ GITHUB ]
                </a>
              )}
            </div>
          </Section>

        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
