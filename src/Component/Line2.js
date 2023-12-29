import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import "./index1.css"

function Graphline2() {
  const [data, setData] = useState([]);
  const [selectedStartYear, setSelectedStartYear] = useState('');

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
    item.start_year === selectedStartYear ));

  const uniquesectors = [...new Set(data.map(data => data.sector))];

  return (
    <div className="Line2">
      
      <div className='line2filter'>
      <label htmlFor="startYearFilter">Select Start Year:</label>
<select id="startYearFilter" value={selectedStartYear} onChange={handleStartYearChange} style={{color:"#064FF0"}}>
  {uniqueStartYears.map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>
</div>

     
      <Line
  data={{
    labels: uniquesectors,
    datasets: [
      {
        label: 'Intensity',
        fill: false,
        backgroundColor: "blue 0.5",
        borderColor: "blue",
        data: filteredData.map(item => item.intensity),
      }, {
        label: 'Relevance',
        fill: false,
        backgroundColor: "green 0.5",
        borderColor: "green",
        borderDash: [5, 5],
        data: filteredData.map(item => item.relevance),
      }, {
        label: 'Impact',
        backgroundColor: "#FFE000",
        borderColor: "red",
        data: filteredData.map(item => item.impact),
        fill: true,
      }
    ]
  }}
  options={{
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Comparison of intensity, Relevance, Impact for ${selectedStartYear}`,
        color: "#22F622",
        font: {
          size: 26, 
        },
      },
    },
  }}
/>
    </div>
  );
}

export default Graphline2;
