import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiReact, SiNodedotjs, SiPython, 
  SiMongodb, SiDocker, SiHtml5, SiCss, 
  SiTypescript, SiVite, SiFigma, SiGithub,
  SiExpress, SiPostgresql, SiTailwindcss, SiNextdotjs,
  SiGit, SiVercel, SiMysql, SiFirebase
} from 'react-icons/si';
import './FloatingIcons.css';

const allIcons = [
  SiJavascript, SiReact, SiNodedotjs, SiPython, 
  SiMongodb, SiDocker, SiHtml5, SiCss, 
  SiTypescript, SiVite, SiFigma, SiGithub,
  SiExpress, SiPostgresql, SiTailwindcss, SiNextdotjs,
  SiGit, SiVercel, SiMysql, SiFirebase
];

const FloatingIcons = ({ count = 6, sectionId = "default" }) => {
  // Use sectionId to generate deterministic "random" positions
  const getSeed = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const seed = getSeed(sectionId);
  
  const icons = Array.from({ length: count }).map((_, i) => {
    const Icon = allIcons[(i + seed) % allIcons.length];
    // Spread them across the container
    const x = ((i * 137 + seed * 41) % 90) + 5; 
    const y = ((i * 151 + seed * 67) % 90) + 5;
    const size = ((i * 17 + seed * 3) % 20) + 30; 
    const duration = ((i * 11 + seed * 7) % 15) + 25; 
    
    return { Icon, x: `${x}%`, y: `${y}%`, size, duration };
  });

  return (
    <div className="floating-icons-layer">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="floating-icon-wrapper"
          style={{ 
            left: item.x, 
            top: item.y, 
            fontSize: item.size 
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 15, 0],
            rotate: [0, 12, -12, 0],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index + seed % 5) * 0.4
          }}
        >
          <item.Icon />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
