
import React from 'react';
import './index2.css'; 

const projectData = [
  {
    title: 'Life Saviour System(L2S)',
    technology: 'IOT',
    objective: 'Save Lifes',
    description: 'L2S system help to save lifes in some critical situation like fire emergency, earthquake, medical emergency,etc through qucik evacuation and intelligent decisions making system.',
  },
  {
    title: 'Education Roadmap System',
    technology: 'Core Java',
    objective: 'Guidance',
    description: 'It provide the road map for education and help student to get there dream college which is sutaible for there requirements.It also helps to get information about reserve sets.',
  },
  {
    title: 'Hotal Management System',
    technology: 'Core Java',
    objective: 'Management',
    description: 'It helps to manage hotal tasks like orders, price , payment etc.',
  },
  {
    title: 'Employee Management',
    technology: 'Advance Java(J2EE)',
    objective: 'Creating web app',
    description: 'This J2EE application allows to connect over front end web app through over backend database like mysql and perform CRUD operation using JSP andServlet',
  },
  
  {
    title: 'Student Management',
    technology: 'Hibernate & SQL',
    objective: 'Management',
    description: 'It helps to manage task related to student data like storing, retrievin, updating, delete, filtering etc.',
  },
  {
    title: 'Data Api',
    technology: 'Spring Boot',
    objective: 'Creating api',
    description: 'This spring boot application stores the data in mysql database and create a api which provide the data from mysql.',
  },

  
];

function Projectdata() {
  return (
    <div className="Project_data">
      <header className="projecthead">
        <h1>Projects</h1>
      </header>
      <div className="Projects-list">
        {projectData.map((project, index) => (
          <div key={index} className="Project-details">
            <h2 style={{color:"green"}}>{project.title}</h2>
            <h3>Technology: {project.technology}</h3>
            <h4>Objective: {project.objective}</h4>
            <p>Description: {project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projectdata;
