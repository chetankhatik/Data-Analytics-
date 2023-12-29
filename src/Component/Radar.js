import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar } from "react-chartjs-2";
import './index1.css';

function Graph7() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/data/api')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const filteredData = data.filter(item => (
item.start_year >= 2018 && item.start_year <= 2028 && item.sector && item.country
  ));

  const uniqueSector = [...new Set(filteredData.map(item => item.sector))];
  const uniqueCountries = [...new Set(filteredData.map(item => item.country))];

  
  const chartData = uniqueCountries.map(country => {
    return {
      label: country,
      data: uniqueSector.map(sector => {
        const filteredItems = filteredData.filter(item => (
          item.country === country && item.sector === sector
        ));
        return filteredItems.length > 0 ? filteredItems[0].end_year : 0;
      }),
      fill: true,
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      pointBackgroundColor: getRandomColor(),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: getRandomColor()
    };
  });

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Country and Sector Analysis',
        fontSize: 16,
        color:'#22F622 ',
      },
    },
  };

  return (
    <div className="radar">
      <Radar
        data={{
          labels: uniqueSector,
          datasets: chartData
        }}
        options={chartOptions}
      />
    </div>
  );
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default Graph7;
