import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index1.css";

function Graph2() {
  
  const [data, setData] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8080/data/api')
          .then(response => { 
              setData(response.data)    
          })
          .catch(error => {
              console.log(error)
          })
            
}, []
  )
  return (
    <div className="bar">
    <Bar
    data = {{
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40,35,68,98,67,34],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
 } }
    />
  </div>

  );
}

export default Graph2;

