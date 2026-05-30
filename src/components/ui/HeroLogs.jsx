import React, { useState, useEffect } from 'react';
import './HeroLogs.css';

const LOG_LINES = [
  '> npm run portfolio',
  '✓ Ready',
  '> Loading modules...',
  '✓ React',
  '✓ Node.js',
  '✓ MongoDB',
  '> System initialized...'
];

const HeroLogs = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentLine = 0;
    
    const showNextLine = () => {
      if (currentLine < LOG_LINES.length) {
        setVisibleLines(prev => [...prev, LOG_LINES[currentLine]]);
        currentLine++;
        setTimeout(showNextLine, 600 + Math.random() * 800);
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(showNextLine, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-background-logs mono" aria-hidden="true">
      {visibleLines.map((line, idx) => (
        <div key={idx} className="log-line">
          {line}
        </div>
      ))}
      {isTyping && <div className="log-cursor" />}
    </div>
  );
};

export default HeroLogs;
