
import React, { useState } from 'react';
import './index2.css';
import Homedata from './Home';
import SkillsData from './Skills';
import Contactdata from './Contact';
import Projectdata from './Projects';

const Home = () => (
  <div>
    <Homedata/>
  </div>
);

const Skills = () => (
  <div>
    <SkillsData/>
  </div>
);

const Projects = () => (
  <div>
    <Projectdata/>
  </div>
);

const Contact = () => (
  <div>
    <Contactdata/>
  </div>
);

function Main() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="pdata">
      <header className='header'>
        <nav className='port'>
          <ul>
            <li><a href="#home" onClick={() => handleNavClick('home')}>Home</a></li>
            <li><a href="#skills" onClick={() => handleNavClick('skills')}>Skills</a></li>
            <li><a href="#projects" onClick={() => handleNavClick('projects')}>Projects</a></li>
            <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className='data'>
        <section className="datacontent">
          {renderActiveComponent()}
        </section>
      </main>
      <footer className='footer'>
        <p>&copy; 2023 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
