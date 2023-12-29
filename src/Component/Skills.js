
import React from 'react';
import './Port.css';

const technicalSkills = [
  { name: 'Core Java', image: './java.png' },
  { name: 'J2EE', image: './j2ee.jpg' },
  { name: 'Hibernate', image: './hiber.png' },
  { name: 'Spring Boot', image: './spring.png' },
  { name: 'SQL', image: 'database.png' },
  { name: 'HTML', image: 'html-5.png' },
  { name: 'CSS', image: 'css-3.png' },
  { name: 'JavaScript', image: 'java-script.png' },
  { name: 'jQuery', image: 'jq.png' },
  { name: 'Bootstrap', image: 'bootstrap.png' },
];

const softSkills = ["Leadership quality",
  "Communication skills",
 " Adaptability skills",
 " Problem solving",
  "Influencing skills",
"Teamworking"];

const SkillsData = () => {
  return (
    <div className="skills-container">
      <h2>Technical Skills</h2>


      <div className="skills-list">
        {technicalSkills.map((skill, index) => (
          <div key={index} className="skill-item">
            <img src={skill.image} alt={`${skill.name} Logo`} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>

      <h2>Soft Skills</h2>
      <div className="soft-skills-list">
        {softSkills.map((skill, index) => (
          <div key={index} className="soft-skill-item">
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsData;
