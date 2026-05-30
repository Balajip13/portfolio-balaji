import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Certifications from '../components/sections/Certifications';
import ResumeSection from '../components/sections/ResumeSection';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <ResumeSection />
      <Contact />
    </div>
  );
};

export default Home;
