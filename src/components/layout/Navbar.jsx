import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/#')) {
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          BALAJI P<span>_</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                onClick={() => handleLinkClick(link.path)}
                className={location.pathname === '/' && location.hash === link.path.substring(1) ? 'active' : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          
          <div className="status-pill glass">
            <span className="dot"></span>
            <span className="status-text">Available for work</span>
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className={`mobile-menu ${isOpen ? 'open' : ''} glass`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} onClick={() => handleLinkClick(link.path)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
