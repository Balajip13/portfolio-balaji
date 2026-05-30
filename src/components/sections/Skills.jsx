import React from 'react';
import { motion } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import * as FiIcons from 'react-icons/fi';
import FloatingIcons from '../ui/FloatingIcons';
import SectionBootLabel from '../ui/SectionBootLabel';
import { useData } from '../../context/DataContext';
import './Skills.css';

const Skills = () => {
  const { portfolioData } = useData();
  const { skills } = portfolioData;

  const getIcon = (iconName, skillName) => {
    // 1. Try exact match from data
    const SiIcon = SiIcons[iconName];
    if (SiIcon) return <SiIcon size={32} />;
    
    const FiIcon = FiIcons[iconName];
    if (FiIcon) return <FiIcon size={32} />;

    // 2. Try to resolve based on skill name (Si prefix)
    const cleanName = (skillName || "").replace(/[^a-zA-Z0-9]/g, '');
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
    
    // Try variations: SiPython, SiCsharp, SiNumpy
    const siName = `Si${capitalized}`;
    const ResolvedSi = SiIcons[siName];
    if (ResolvedSi) return <ResolvedSi size={32} />;

    // 3. Try variations for C# and C++ specifically
    if (skillName?.toLowerCase() === "c#" && SiIcons.SiCsharp) return <SiIcons.SiCsharp size={32} />;
    if (skillName?.toLowerCase() === "c++" && SiIcons.SiCplusplus) return <SiIcons.SiCplusplus size={32} />;

    // 4. Default fallback
    const Fallback = FiIcons.FiCode;
    return <Fallback size={32} />;
  };

  const getHoverSnippet = (skillName) => {
    const name = (skillName || "").toLowerCase();
    if (name.includes('react')) return '<React />';
    if (name.includes('node')) return '{Node}';
    if (name.includes('mongo') || name.includes('sql')) return 'db.query()';
    if (name.includes('js') || name.includes('javascript') || name.includes('type')) return '=> {}';
    if (name.includes('python')) return 'def init():';
    if (name.includes('html') || name.includes('css')) return '<div></div>';
    if (name.includes('git')) return 'git push';
    return 'const api = ()';
  };

  const categories = [
    { label: "TECH STACK", skills: skills.technologies },
    { label: "TOOLS", skills: skills.tools }
  ];

  return (
    <section className="skills-redesign" id="skills">
      <SectionBootLabel moduleName="TECHNICAL_EXPERTISE" />
      <FloatingIcons count={8} sectionId="skills" />
      <div className="container compact-container">
        <h2 className="skills-title-compact">Technical Expertise</h2>
        
        <div className="skills-categories-stack">
          {categories.map((cat, idx) => (
            <div key={idx} className="skills-category-group">
              <div className="category-header">
                <h3 className="category-label mono">{cat.label}</h3>
              </div>

              <div className="skills-grid-standard">
                {cat.skills.map((skill, sIdx) => (
                  <motion.div 
                    key={sIdx}
                    className="skill-card-standard glass"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: sIdx * 0.04 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="skill-hover-snippet mono" aria-hidden="true">
                      {getHoverSnippet(skill.name)}
                    </div>
                    <div className="skill-icon-box">
                      {getIcon(skill.icon, skill.name)}
                    </div>
                    <span className="skill-txt mono">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
