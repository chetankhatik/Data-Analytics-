import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PolarArea } from "react-chartjs-2";
import './index1.css';

function Graph6() {
  const [data, setData] = useState([]);
  const [selectedStartYear, setSelectedStartYear] = useState('2018');

  useEffect(() => {
    axios.get('http://localhost:8080/data/api')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  
  const uniqueStartYears = [...new Set(data.map(item => item.start_year))];

 
  const handleStartYearChange = (event) => {
    setSelectedStartYear(event.target.value);
  };

  
  const filteredData = data.filter(item => (
    item.start_year === selectedStartYear &&
    item.sector !== '' &&
    item.impact !== ''
  ));

  return (
    <div className="polararea">
    
      
      <label htmlFor="startYearFilter" style={{color:"blue"}}>Select Start Year:</label>
      <select id="startYearFilter" value={selectedStartYear} onChange={handleStartYearChange} style={{color:"blue"}}>
        {uniqueStartYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      
    
      <PolarArea
        data={{
          labels: filteredData.map(data => data.sector),
          datasets: [{
            label: 'Impact',
            data: filteredData.map(data => data.impact),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
            ],
          }]
        }}
        options={{
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true,
            }
          },
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: `Impact by Sector and Topic for ${selectedStartYear}`,
              color:'#22F622 ',
            },
          },
        }}
      />
    </div>
  );
}

export default Graph6;
