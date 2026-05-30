import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import ProjectModal from '../ui/ProjectModal';
import { useData } from '../../context/DataContext';
import './Projects.css';

const ProjectCard = ({ project, index, isFeatured, onClick }) => {
  const filename = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.exe';
  const projectNumber = `PROJECT_0${index + 1}`;

  return (
    <motion.div
      className={`proj-card-terminal glass ${isFeatured ? 'proj-card-featured' : 'proj-card-compact'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="terminal-header">
        <div className="mac-dots">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot maximize"></span>
        </div>
        <span className="terminal-filename mono">{filename}</span>
      </div>
      
      <div className="proj-card-body">
        <div className="proj-preview-wrapper">
          <img src={project.thumbnail} alt={project.title} className="proj-preview-img" />
          <div className="proj-status-badge mono">
            <span className="status-dot"></span> LIVE
          </div>
        </div>
        
        <div className="proj-info">
          <div className="proj-id-badge mono">{projectNumber}</div>
          <h3 className={`proj-title ${!isFeatured ? 'proj-title-sm' : ''}`}>{project.title}</h3>
          
          <p className={`proj-desc ${!isFeatured ? 'proj-desc-sm' : ''}`}>{project.description}</p>
          
          {isFeatured && project.features && project.features.length > 0 && (
            <ul className="proj-features">
              {project.features.map((f, i) => (
                <li key={i} className="proj-feature-item">
                  <span className="feature-bullet">&gt;</span> {f}
                </li>
              ))}
            </ul>
          )}

          <div className="proj-tags">
            <span className="tags-label mono">STACK:</span>
            {(isFeatured ? project.technologies : project.technologies.slice(0, 3)).map((t) => (
              <span key={t} className="tag mono">[{t}]</span>
            ))}
          </div>

          <div className="proj-actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-action-btn primary mono"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink /> LIVE DEMO
              </a>
            )}
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-action-btn secondary mono"
                onClick={(e) => e.stopPropagation()}
                title="View Source Code"
              >
                <FiGithub /> GITHUB
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { portfolioData } = useData();
  const [selectedProject, setSelectedProject] = useState(null);

  const currentProjects = portfolioData?.projects && portfolioData.projects.length > 0
    ? portfolioData.projects
    : [];

  const [featured, ...rest] = currentProjects;

  return (
    <section className="projects-redesign" id="projects">
      <SectionBootLabel moduleName="APP_SHOWCASE" />
      <FloatingIcons count={9} sectionId="projects" />
      <div className="container">
        <h2 className="section-title proj-title-large">Projects</h2>

        <div className="projects-showcase">
          {featured && (
            <ProjectCard
              project={featured}
              index={0}
              isFeatured={true}
              onClick={() => setSelectedProject(featured)}
            />
          )}
          <div className="projects-stack">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i + 1}
                isFeatured={false}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
