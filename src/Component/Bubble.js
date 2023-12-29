import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bubble } from 'react-chartjs-2';
import './index1.css';

function Graph4() {
  const [data, setData] = useState([]);
  const [selectedEndYear, setSelectedEndYear] = useState('2020'); // Default selected end year

  useEffect(() => {
    axios.get('http://localhost:8080/data/api')
      .then(response => { 
        setData(response.data)    
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  const end_years = data.map(data => data.end_year);
  const uniqueEndYears = [...new Set(end_years)];


//It will execute the code inside the body {} when event is triggered.
  const handleEndYearChange = (event) => {setSelectedEndYear(event.target.value);};



  const filteredData = data.filter(item => (item.end_year >= selectedEndYear));

  const bubbleChartData = filteredData.map(item => ({
    x: item.impact,
    y: item.likelihood,
    r: (() => {
      if (item.impact <= 2) {
        return 8;
      } else if (item.impact >= 2) {
        return 12;
      } else if (item.impact === 2) {
        return 16;
      } else {
        return 8;
      }
    })(),
    title: item.title,
  }));

  //Ternary Operator
  const noDataMessage = filteredData.length === 0 ? 'No data found for selected end year.' : '';

  return (
    <div className="Bubble">

    <div className='bubble-filter'>
      <label htmlFor="endYearFilter">Select End Year:</label>
      <br />
  {/* Onchange event according to the options(options will be Unique End_Years)      */}
      <select id="endYearFilter" value={selectedEndYear} onChange={handleEndYearChange} style={{color:'#064FF0'}}>
        {uniqueEndYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </div>
      {/* conditional rendering approach to display a message when there is no data  */}
      {noDataMessage && <div className="no-data-message">{noDataMessage}</div>}
      <br />
      <br />
      <br />
      <Bubble
        data={{
          datasets: [{
            label: 'Bubble Chart',
            data: bubbleChartData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
          }],
        }}
        options={{
          aspectRatio: 2,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Impact',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Likelihood',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Titles Likelihood and Impact',
              color: '#22F622',
              font: {
                size: 36,
              },
            },
            //Display The Title of the articles according to the impact and likelihood
            tooltip: {
              callbacks: {
                label: (context) => {
                  const dataPoint = bubbleChartData[context.dataIndex];
                  //Fetch the title from Dataset
                  return `Title: ${dataPoint.title}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Graph4;
