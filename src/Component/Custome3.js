import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index1.css'; 

const Customechart = () => {
  const [data, setData] = useState([]);
  const [selectedEndYear, setSelectedEndYear] = useState('2022');

  useEffect(() => {
    axios
      .get('http://localhost:8080/data/api')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 
  const availableEndYears = [...new Set(data.map((item) => item.end_year))];

  
  const filteredData = selectedEndYear ? data.filter((item) => item.end_year === selectedEndYear): data; 
  const handleChange = (event) => {
    setSelectedEndYear(event.target.value);
  };

  return (
    <div>
      
      <div className='headtitle'>
      <h1>Insight Infomation</h1>
      </div>
      <div className='Fx'>
      <label htmlFor="endYearSelect">Select End Year: </label>
      <select id="endYearSelect" value={selectedEndYear} onChange={handleChange}>
        <option value={null}>All</option>
        {availableEndYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </div>
     
      <div className="articles-container">
        {filteredData.map((item) => (
          <article key={item.id} className="article">
            <h3>{item.end_year}</h3>
            <p>Insight: {item.insight}</p>
            {item.swot && <p>SWOT: {item.swot}</p>} 
          </article>
        ))}
      </div>
    </div>
  );
};

export default Customechart;
