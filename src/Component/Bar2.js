import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import './index1.css';

function Graphx()
{

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
            <div className='bar2'>
            <Bar

            data = {{
                options: {
                    plugins: {
                      title: {
                        display: true,
                        text: 'Chart.js Bar Chart - Stacked'
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true
                      }
                    }
                  },
                labels: ["A","B","C","D","E"],
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: [10,-78,100,-90,23],
                    backgroundColor:"red",
                  },
                  {
                    label: 'Dataset 2',
                    data: [-10,78,-100,90,-23],
                    backgroundColor: "blue",
                  },
                  {
                    label: 'Dataset 3',
                    data: [20,-88,95,-80,29],
                    backgroundColor: "green",
                  },
                ]
            }}

            />
            
            </div>



    )
}

export default Graphx;