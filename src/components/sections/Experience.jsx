import React from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import { useData } from '../../context/DataContext';
import './Experience.css';

const Experience = () => {
  const { portfolioData } = useData();
  const { experience } = portfolioData;

  return (
    <section className="experience-redesign" id="experience">
      <SectionBootLabel moduleName="WORK_HISTORY" />
      <FloatingIcons count={7} sectionId="experience" />
      <div className="container compact-experience-container">
        <h2 className="experience-title-modern">Professional Experience</h2>
        
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <motion.div 
              key={exp.id || index} 
              className="experience-card-modern"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-rail">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>

              <div className="experience-card-content glass">
                <div className="experience-bg-logs mono" aria-hidden="true">
                  <span>[INFO] Frontend initialized</span>
                  <span>[OK] Database connected</span>
                  <span>[READY] Deployment active</span>
                </div>
                <div className="exp-left-side">
                  <span className="exp-date mono">{exp.duration}</span>
                </div>

                <div className="exp-center-content">
                  <h3 className="exp-role-title">{exp.role}</h3>
                  <h4 className="exp-company-name mono">{exp.company}</h4>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="exp-bullets">
                      {exp.bullets.map((point, i) => (
                        <li key={i} className="exp-bullet-item">{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="exp-desc-compact">
                      {exp.description || "Worked on modern full-stack web applications and responsive digital platforms while gaining hands-on experience in frontend and backend development, UI design, database integration, and real-world software development workflows."}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
