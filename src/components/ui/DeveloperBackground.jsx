import React, { useEffect, useState } from 'react';
import './DeveloperBackground.css';

const SNIPPETS = [
  'const skills = ["React","Node","MongoDB"];',
  'model.fit(X_train)',
  '<section id="projects">',
  'async function deploy(){}',
  'npm run build',
  'import { useState } from "react";',
  'db.collection("users").find()',
  'git push origin main',
  'export default App;',
  'if (success) return true;',
];

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';

const DeveloperBackground = () => {
  const [snippets, setSnippets] = useState([]);
  const [matrixCols, setMatrixCols] = useState([]);

  useEffect(() => {
    // Generate snippets
    const numSnippets = 10;
    const initialSnippets = Array.from({ length: numSnippets }).map((_, i) => ({
      id: i,
      text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      top: `${10 + Math.random() * 80}%`,
      left: `${5 + Math.random() * 70}%`,
      duration: `${18 + Math.random() * 12}s`,
      delay: `-${Math.random() * 20}s`,
    }));
    setSnippets(initialSnippets);

    // Generate sparse matrix columns
    const numCols = Math.floor(window.innerWidth / 150) || 5; 
    const cols = Array.from({ length: numCols }).map((_, i) => ({
      id: `col-${i}`,
      left: `${(i / numCols) * 100 + (Math.random() * 5)}%`,
      delay: `-${Math.random() * 15}s`,
      duration: `${20 + Math.random() * 20}s`,
      chars: Array.from({ length: 10 + Math.floor(Math.random() * 10) })
        .map(() => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
        .join('\n')
    }));
    setMatrixCols(cols);
    
    const interval = setInterval(() => {
      setMatrixCols(prev => prev.map(col => ({
        ...col,
        chars: Array.from({ length: col.chars.split('\n').length })
          .map(() => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
          .join('\n')
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="developer-background" aria-hidden="true">
      <div className="matrix-layer">
        {matrixCols.map(col => (
          <div 
            key={col.id} 
            className="matrix-col"
            style={{ 
              left: col.left, 
              animationDelay: col.delay,
              animationDuration: col.duration
            }}
          >
            {col.chars}
          </div>
        ))}
      </div>
      
      <div className="snippets-layer">
        {snippets.map(snippet => (
          <div 
            key={snippet.id} 
            className="floating-snippet"
            style={{
              top: snippet.top,
              left: snippet.left,
              animationDuration: snippet.duration,
              animationDelay: snippet.delay
            }}
          >
            {snippet.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperBackground;
