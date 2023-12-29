import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import './index1.css';

function ScaleGraph()
{

 const [data, setData] = useState([]);
 const [selectedSector, setSelectedSector] = useState("Information Technology");
 const [filteredData, setFilteredData] = useState([]);
 const [selectedEndYear, setSelectedEndYear] = useState('2029');

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/api', {
          // Add other required parameters here
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
 }, []);

 useEffect(() => {
    if (selectedSector === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.sector === selectedSector);
      setFilteredData(filtered);
    }
 }, [selectedSector, data]);

 useEffect(() => {
    if (selectedEndYear === 2018) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.end_year === selectedEndYear);
      setFilteredData(filtered);
    }
 }, [selectedEndYear, data]);

 const uniqueSectors = [...new Set(data.map(data => data.sector))];
 const likelihood = filteredData.map((data) => data.likelihood);
 const relevance = filteredData.map((data) => data.relevance);
 const topics = filteredData.map((data) => data.topic);
 const impact = filteredData.map((data) => data.impact);
 

 const dataCollection = {
    labels: topics,
    datasets: [
      {
        type: 'bar',
        label: 'Likelihood',
        backgroundColor: "rgb(237, 187, 153 )",
        borderColor: "red",
        data: likelihood,
      },
      {
        type: 'line',
        label: 'Relevance',
        backgroundColor: "rgb(130, 224, 170 )",
        borderColor: "green",
        fill: false,
        data: relevance,
      },
      {
        type: 'bar',
        label: 'Impact',
        backgroundColor: "#CB48EC ",
        borderColor: "orange",
        data: impact,
      }
    ]
 };

 const endYearOptions = [];
 for (let i = 2018; i <= 2065; i++) {
   endYearOptions.push(<option key={i} value={i}>{i}</option>);
 }

 return(
    <div>
      
      <div className="linebar">
      <div className='main1last'>

      <div >
        <label>Sector:</label>
        <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)} style={{color:"#064FF0"}}>
          <option value="All">All</option>
          {uniqueSectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}
        </select>
      </div>
      <div>
        <label>End Year:</label>
        <select value={selectedEndYear} onChange={e => setSelectedEndYear(e.target.value)} style={{color:"#064FF0"}}>
          {endYearOptions}
        </select>
      </div>
      </div>

        <Bar
          data={dataCollection}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Likelihood, Relevance, Impact across different sectors',
                color:"#22F622"
              },
            },
          }}
        />
      </div>
    </div>
 );
}

export default ScaleGraph;