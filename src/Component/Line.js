import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import './index1.css';

function Graph1() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2019');
  const [selectedEndYear2, setSelectedEndYear2] = useState('2020');

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

  const handleEndYear2Change = (event) => {
    setSelectedEndYear2(event.target.value);
  };

  const filteredData = data.filter(item => (
    item.end_year === selectedYear &&
    item.sector !== '' &&
    item.intensity !== ''
  ));

  const filteredData2 = data.filter(item => (
    item.end_year === selectedEndYear2 &&
    item.sector !== '' &&
    item.intensity !== ''
  ));

  return (
    <div className="Line1">
      <div className='mainfilter'>
        <label htmlFor="yearFilter" className='filter'>Select Year:</label>
        <select id="yearFilter" value={selectedYear} onChange={handleYearChange}>
          {uniqueEndYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="endYear2Filter" className='filter'>Select End Year 2:</label>
        <select id="yearFilter" value={selectedEndYear2} onChange={handleEndYear2Change}>
          {uniqueEndYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Line
        data={{
          labels: filteredData.map(data => data.sector),
          datasets: [
            {
              label: `Intensity ${selectedYear}`,
              data: filteredData.map(data => data.intensity),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
            {
              label: `Intensity ${selectedEndYear2}`,
              data: filteredData2.map(data => data.intensity),
              backgroundColor: "#FF5733",
              borderColor: "#FF5733",
            },
          ],
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
              text: `Intensity by Sector for ${selectedYear} and ${selectedEndYear2}`,
              color:'#22F622 ',
            },
          },
        }}
      />
    </div>
  );
}

export default Graph1;
