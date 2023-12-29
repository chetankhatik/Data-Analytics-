import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './index1.css';

const CustomizedChart = () => {
  const [data, setData] = useState([]);
  const [selectedEndYear, setSelectedEndYear] = useState('2018');

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

  const handleChange = (event) => {
    setSelectedEndYear(event.target.value);
  };

  
  const endYearOptions = [];
  for (let dataObj of data) {
    if (!endYearOptions.includes(<option key={dataObj.end_year} value={dataObj.end_year}>{dataObj.end_year}</option>)) {
      endYearOptions.push(<option key={dataObj.end_year} value={dataObj.end_year}>{dataObj.end_year}</option>);
    }
  }

  const filteredData = data.filter(data => data.end_year === selectedEndYear);
  const topics = filteredData.map(data => data.topic);
  const intensity = filteredData.map(data => data.intensity);

  return (
    <div>
      <div className='custome2'>
        <label>End Year:</label>
        <select value={selectedEndYear} onChange={handleChange}>
          {endYearOptions}
        </select>
      </div>
      <Line
        data={{
          labels: topics,
          datasets: [
            {
              label: 'Intensity',
              data: intensity,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Intensity Trends Over Topics',
              color:'#22F622',
              font: {
                size: 56,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CustomizedChart;
