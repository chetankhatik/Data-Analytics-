import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scatter } from "react-chartjs-2";
import './index1.css';

function Graph5() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2018');

  useEffect(() => {
    axios.get('http://localhost:8080/data/api')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  
  const uniqueEndYears = [...new Set(data.map(item => item.end_year))];

  
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  
  const filteredData = data.filter(item => (
    item.end_year === selectedYear &&
    item.impact !== '' &&
    item.pestle !== '' &&
    item.relevance !== ''
  ));

  return (
    <div className="Mixed">
    
      
      <div className='mainfilter'>
      <label htmlFor="yearFilter" className='filter2'>Select Year:</label>
      <select id="yearFilter" value={selectedYear} onChange={handleYearChange}>
        {uniqueEndYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </div>
      
      <Scatter
        data={{
          labels: filteredData.map(data => data.pestle),
          datasets: [{
            type: 'bar',
            label: 'Impact Dataset',
            data: filteredData.map(data => data.impact),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            type: 'line',
            label: 'Relevance Dataset',
            data: filteredData.map(data => data.relevance),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
              text: `Impact of Pestle for ${selectedYear}`,
              color:'#22F622 ',
            },
          },
        }}
      />
    </div>
  );
}

export default Graph5;
