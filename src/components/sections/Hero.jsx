import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import HeroLogs from '../ui/HeroLogs';
import { useData } from '../../context/DataContext';
import './Hero.css';

const Hero = () => {
  const { portfolioData } = useData();
  const { profile } = portfolioData;
  const [displayText, setDisplayText] = useState('');
  const roles = profile.roles || [];

  const typeState = useRef({ 
    roleIndex: 0, 
    isDeleting: false,
    textLength: 0 
  });
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (roles.length === 0) return;

    const tick = () => {
      const state = typeState.current;
      const currentRole = roles[state.roleIndex];

      if (!state.isDeleting) {
        if (state.textLength < currentRole.length) {
          state.textLength++;
          setDisplayText(currentRole.substring(0, state.textLength));
          timeoutRef.current = setTimeout(tick, 60);
        } else {
          timeoutRef.current = setTimeout(() => {
            state.isDeleting = true;
            tick();
          }, 2500);
        }
      } else {
        if (state.textLength > 0) {
          state.textLength--;
          setDisplayText(currentRole.substring(0, state.textLength));
          timeoutRef.current = setTimeout(tick, 40);
        } else {
          state.isDeleting = false;
          state.roleIndex = (state.roleIndex + 1) % roles.length;
          timeoutRef.current = setTimeout(tick, 60);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timeoutRef.current);
  }, [roles]);

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.resume;
    link.download = 'Resume_Balaji_P.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <section className="hero-compact-2025" id="home">
      <div className="hero-glow-layer">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
        <FloatingIcons count={10} sectionId="hero" />
        <HeroLogs />
      </div>

      <div className="container hero-balanced-container">
        <div className="hero-text-side">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="hero-h1-compact">
              Hi, I'm <span className="cyan-neon">{profile.name}</span>
            </h1>
            
            <div className="role-box-minimal mono">
              <span className="accent-txt">&gt; </span>
              <span className="typing-text">{displayText}</span>
              <span className="blinking-line">|</span>
            </div>

            <p className="hero-p-compact">
              Building scalable full-stack applications and data-driven solutions with 
              modern web technologies and problem-solving expertise.
            </p>

            <div className="hero-btn-stack">
              <button className="btn-modern-hire" onClick={handleHireMe}>
                Hire Me
              </button>

              <a href={portfolioData.resume} download="Resume_Balaji_P.pdf" className="btn-modern-resume">
                <FiDownload /> Resume
              </a>
            </div>

            <div className="hero-social-minimal">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="soc-link"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/balaji-p1/" target="_blank" rel="noopener noreferrer" className="soc-link"><FiLinkedin /></a>
              <a href={`mailto:${profile.email}`} className="soc-link"><FiMail /></a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual-side"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-terminal-card glass">
            <div className="hero-terminal-header">
              <div className="mac-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title mono">profile.exe</span>
            </div>
            <div className="profile-image-wrapper">
              <img src={profile.image || "/profile.jpg"} alt={profile.name} className="profile-image" />
              <div className="profile-glow-overlay"></div>
            </div>
            <div className="hero-code-badge">
              &lt;/&gt;
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
