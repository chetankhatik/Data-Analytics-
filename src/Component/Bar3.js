import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './index1.css';

function Graphy() {

  //  Uisng Hocks //
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/data/api')
      .then(response => { 
        setData(response.data)    
      })
      .catch(error => {
        console.log(error)
      });
  }, []);


 //First 10 UniqueCountries
  const uniqueCountries = [...new Set(data.filter(item => item.country !== '').map(item => item.country).slice(0, 5))];

  //Pestle where Column is not empty
  const nonEmptyPestleData = data.filter(item => item.pestle !== '');

 //Uniqe Pestle(No repetation of Pestle)
  const uniquePestle = [...new Set(nonEmptyPestleData.map(item => item.pestle))];

  
  //Fetch Pestle and Likelihood From the Dataset Where Pestledata is Not Empty.
  const pestleData = uniquePestle.map(pestle => ({
    label: pestle,
    data: nonEmptyPestleData.filter(item => item.pestle === pestle).map(item => item.likelihood),
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(0.5),
    borderWidth: 2,
  }));



  return (
    <div className="bar3">
      <Bar
        data={{
          //UniqueCountries As a labels for X axis
          labels: uniqueCountries,
           //PestleData for Dataset
          datasets: pestleData,
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Likelihood Data by Pestle and Country',
              color:'#22F622 ',
              font: {
                size: 28,
              },
            },
          },
        }}
      />
    </div>
  );
}



function getRandomColor(alpha = 1) {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + Math.floor(alpha * 255).toString(16);
}

export default Graphy;
