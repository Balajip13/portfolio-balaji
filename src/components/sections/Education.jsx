import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import './Education.css';

const education = [
  {
    degree: "Master of Computer Applications",
    school: "SRM Institute of Science and Technology, Chennai",
    cgpa: "9.13",
    duration: "2024 – 2026"
  },
  {
    degree: "Bachelor of Science (Computer Science)",
    school: "SRM Institute of Science and Technology, Chennai",
    cgpa: "8.29",
    duration: "2020 – 2023"
  }
];

const pythonCode = [
  { id: 'c-1', text: "import tensorflow as tf", type: "input" },
  { id: 'c-2', text: "import numpy as np", type: "input" },
  { id: 'c-3', text: " ", type: "dim" },
  { id: 'c-4', text: "model = tf.keras.Sequential([", type: "input" },
  { id: 'c-5', text: "    tf.keras.layers.Dense(128, activation='relu'),", type: "input" },
  { id: 'c-6', text: "    tf.keras.layers.Dropout(0.2),", type: "input" },
  { id: 'c-7', text: "    tf.keras.layers.Dense(10, activation='softmax')", type: "input" },
  { id: 'c-8', text: "])", type: "input" },
  { id: 'c-9', text: " ", type: "dim" },
  { id: 'c-10', text: "model.fit(X_train, y_train)", type: "input" },
];

const pythonOutput = [
  { id: 'o-1', text: "Loading dataset... Done", type: "success" },
  { id: 'o-2', text: "Training... Epoch 50/50: loss: 0.0892 - acc: 0.9821", type: "info" },
  { id: 'o-3', text: "Model accuracy: 98.2%", type: "success" },
  { id: 'o-4', text: "✓ Training complete.", type: "success" }
];

const TerminalPanel = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [phase, setPhase] = useState('TYPING'); // TYPING, OUTPUT, WAITING
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines, currentCharIdx]);

  useEffect(() => {
    if (phase === 'TYPING') {
      if (currentLineIdx < pythonCode.length) {
        const currentLine = pythonCode[currentLineIdx];
        if (currentCharIdx < currentLine.text.length) {
          const timer = setTimeout(() => setCurrentCharIdx(v => v + 1), 30);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => {
            setVisibleLines(v => [...v, currentLine]);
            setCurrentLineIdx(v => v + 1);
            setCurrentCharIdx(0);
          }, 500);
          return () => clearTimeout(timer);
        }
      } else {
        const timer = setTimeout(() => {
          setVisibleLines(v => [...v, { id: 'spacer', text: " ", type: "dim" }, ...pythonOutput]);
          setPhase('OUTPUT');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }

    if (phase === 'OUTPUT') {
      const timer = setTimeout(() => {
        setPhase('WAITING');
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (phase === 'WAITING') {
      setVisibleLines([]);
      setCurrentLineIdx(0);
      setCurrentCharIdx(0);
      setPhase('TYPING');
    }
  }, [currentLineIdx, currentCharIdx, phase]);

  return (
    <div className="edu-terminal-window glass">
      <div className="edu-terminal-header">
        <span className="edu-dot red"></span>
        <span className="edu-dot yellow"></span>
        <span className="edu-dot green"></span>
        <span className="edu-terminal-title mono">balaji.py</span>
      </div>
      <div className="edu-terminal-body mono" ref={scrollRef}>
        <div className="typing-container">
          {visibleLines.map((line, index) => (
            <div key={`line-${index}`} className={`edu-log-line ${line.type}`}>
              {line.text}
            </div>
          ))}
          {phase === 'TYPING' && currentLineIdx < pythonCode.length && (
            <div className={`edu-log-line ${pythonCode[currentLineIdx].type}`}>
              {pythonCode[currentLineIdx].text.substring(0, currentCharIdx)}
              <span className="edu-cursor">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <section className="education-redesign" id="education">
      <SectionBootLabel moduleName="ACADEMIC_RECORDS" />
      <FloatingIcons count={6} sectionId="education" />
      <div className="container">
        <div className="edu-split-layout">
          <h2 className="section-title edu-title-compact">Education</h2>
          {/* Left — Education Cards */}
          <div className="edu-left">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="edu-entry glass"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="edu-entry-top">
                  <span className="edu-duration mono">{edu.duration}</span>
                  <span className="edu-cgpa-badge mono">CGPA {edu.cgpa}</span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-school mono">{edu.school}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — Terminal Panel */}
          <motion.div
            className="edu-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <TerminalPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
