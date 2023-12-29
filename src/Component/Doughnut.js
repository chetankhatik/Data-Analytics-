import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import "./index1.css";

function Graph3() {
  const [data, setData] = useState([]);
  const [selectedEndYear, setSelectedEndYear] = useState('2020');

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

  
  const handleEndYearChange = (event) => {
    setSelectedEndYear(event.target.value);
  };

 
  const topicsToFilter = ["artificial intelligence","internet of things","3D","cloud","cyber","security"];

 
  const filteredData = data.filter(item => (
    item.end_year >= selectedEndYear &&
    item.sector === 'Information Technology' &&
    topicsToFilter.includes(item.topic)
  ));

  
  const uniquetopics = [...new Set(filteredData.map(data => data.topic))];
  const intensity = filteredData.map(data => data.intensity);

 
  const noTopicsFound = uniquetopics.length === 0;

  return (
    <div className="doughnut">
    
      <label htmlFor="endYearFilter">Select End Year:</label>
      <select id="endYearFilter" value={selectedEndYear} onChange={handleEndYearChange}>
        {uniqueEndYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

     
      {noTopicsFound ? (
        <div className="no-data-message">No data found for selected topics.</div>
      ) : (
        <Doughnut
          data={{
            labels: uniquetopics,
            datasets: [
              {
                label: "Intensity",
                data: intensity,
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(789, 133, 196, 0.8)",
                  "rgba(563, 144, 155, 0.8)",
                  "rgba(897, 66, 185, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 175, 19, 0.8)",
                  "rgba(253, 141, 17, 0.8)",
                  "rgba(789, 133, 196, 0.8)",
                  "rgba(563, 144, 155, 0.8)",
                  "rgba(897, 66, 185, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Intensity Information Technology Topics ",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Graph3;
