import React, { createContext, useContext, useState, useEffect } from 'react';
import profileData from '../data/profile.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

const DataContext = createContext();

const DEFAULT_SKILLS = {
  technologies: [
    { name: "Python", icon: "SiPython" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "React", icon: "SiReact" },
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "Express", icon: "SiExpress" },
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "SQL", icon: "SiPostgresql" },
    { name: "HTML5", icon: "SiHtml5" },
    { name: "CSS3", icon: "SiCss" }
  ],
  tools: [
    { name: "GitHub", icon: "SiGithub" },
    { name: "Git", icon: "SiGit" },
    { name: "Vercel", icon: "SiVercel" },
    { name: "Power BI", icon: "FiBarChart2" },
    { name: "JWT", icon: "SiJsonwebtokens" }
  ]
};

export const DataProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.projects) {
        parsed.projects = projectsData;
      } else {
        parsed.projects = parsed.projects.map(p => {
          const defaultProj = projectsData.find(dp => dp.id === p.id);
          if (defaultProj) {
            return {
              ...p,
              live: (!p.live || p.live === '#') ? defaultProj.live : p.live,
              github: (!p.github || p.github === '#') ? defaultProj.github : p.github,
              overview: defaultProj.overview,
              challenge: defaultProj.challenge,
              solution: defaultProj.solution,
              modalFeatures: defaultProj.modalFeatures,
              projectType: defaultProj.projectType,
              status: defaultProj.status,
            };
          }
          return p;
        });
      }
      parsed.skills = DEFAULT_SKILLS;
      parsed.experience = experienceData;
      parsed.profile = { ...parsed.profile, ...profileData };
      return parsed;
    }
    return {
      profile: profileData,
      experience: experienceData,
      projects: projectsData,
      about: {
        paragraph: "I'm Balaji P, a developer passionate about building meaningful digital experiences and solving real-world problems through modern technology. I enjoy continuous learning and creating clean, impactful solutions.",
        focus: ["Building scalable full-stack applications", "Improving user-focused digital experiences", "Exploring AI and data-driven solutions"],
        goals: ["Building impactful software products", "Growing as a full-stack/software engineer", "Creating meaningful real-world solutions"]
      },
      skills: DEFAULT_SKILLS,
      resume: "/Resume_Balaji_P.pdf"
    };
  });

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updateProfile = (newProfile) => {
    setPortfolioData(prev => ({ ...prev, profile: { ...prev.profile, ...newProfile } }));
  };

  const updateAbout = (newAbout) => {
    setPortfolioData(prev => ({ ...prev, about: { ...prev.about, ...newAbout } }));
  };

  const updateExperience = (newExperience) => {
    setPortfolioData(prev => ({ ...prev, experience: newExperience }));
  };

  const updateSkills = (newSkills) => {
    setPortfolioData(prev => ({ ...prev, skills: newSkills }));
  };

  const updateResume = (newPath) => {
    setPortfolioData(prev => ({ ...prev, resume: newPath }));
  };

  const updateProjects = (newProjects) => {
    setPortfolioData(prev => ({ ...prev, projects: newProjects }));
  };

  return (
    <DataContext.Provider value={{ 
      portfolioData, 
      updateProfile, 
      updateAbout, 
      updateExperience, 
      updateSkills, 
      updateResume,
      updateProjects
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
