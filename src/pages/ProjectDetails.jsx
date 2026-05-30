import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import projectsData from '../data/projects.json';
import { useData } from '../context/DataContext';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { portfolioData } = useData();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const currentProjects = portfolioData?.projects && portfolioData.projects.length > 0 ? portfolioData.projects : projectsData;
    const found = currentProjects.find(p => p.id === parseInt(id));
    if (found) {
      setProject(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate, portfolioData]);

  if (!project) return null;

  return (
    <div className="project-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft /> Back to Portfolio
        </button>

        <motion.div 
          className="details-container glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="details-header">
            <img src={project.thumbnail} alt={project.title} className="details-img" />
          </div>

          <div className="details-content">
            <div className="details-main">
              <h1 className="details-title">{project.title}</h1>
              <div className="details-tech">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              
              <section className="details-section">
                <h2>Project Overview</h2>
                <p>{project.description}</p>
              </section>

              {project.features && (
                <section className="details-section">
                  <h2>Key Features</h2>
                  <ul className="features-list">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.learnings && (
                <section className="details-section">
                  <h2>Learnings & Challenges</h2>
                  <p>{project.learnings}</p>
                </section>
              )}
            </div>

            <aside className="details-sidebar">
              <div className="sidebar-card glass">
                <h3>Project Links</h3>
                <div className="details-actions">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <FiGithub /> View Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <FiExternalLink /> Live Demo
                  </a>
                </div>
              </div>

              <div className="sidebar-card glass">
                <h3>Project Category</h3>
                <p>{project.technologies.includes('MERN Stack') ? 'Full Stack Development' : 'Web Application'}</p>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
