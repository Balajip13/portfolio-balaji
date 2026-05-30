import React from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiFileText } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import { useData } from '../../context/DataContext';
import './About.css';

const About = () => {
  const { portfolioData } = useData();
  const { about } = portfolioData;

  return (
    <section className="about-redesign" id="about">
      <SectionBootLabel moduleName="ABOUT_ME" />
      <FloatingIcons count={6} sectionId="about" />
      <div className="container">
        <motion.div 
          className="about-unified-container glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="about-split-layout">
            <div className="about-content-left">
              <div className="about-title-wrapper">
                <div className="terminal-icon-box">
                  <FiTerminal className="t-icon" />
                </div>
                <h2 className="about-main-title">About Me</h2>
              </div>

              <div className="readme-header">
                <div className="readme-badge-compact">
                  <FiFileText className="readme-icon" />
                  <span className="readme-label mono">README.md</span>
                </div>
              </div>
              
              <div className="readme-body">
                <h1 className="readme-title mono"><span>#</span> Hello World 👋</h1>
                <p className="about-p">
                  {about.paragraph}
                </p>

                <div className="about-vertical-sections">
                  <div className="about-list-group">
                    <h3 className="section-h3 mono"><span>#</span> CURRENT FOCUS</h3>
                    <ul className="about-ul mono">
                      {about.focus.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="about-list-group">
                    <h3 className="section-h3 mono"><span>#</span> FUTURE GOALS</h3>
                    <ul className="about-ul mono">
                      {about.goals.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual-right">
              <div className="about-image-card">
                <img src={portfolioData.profile.image || "/profile_2.jpg"} alt="Balaji P" className="about-img-premium" />
                <div className="img-premium-glow"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
