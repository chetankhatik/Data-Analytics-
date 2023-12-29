import { Chart as ChartJS, defaults } from "chart.js/auto";
import "./index1.css";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 30;
defaults.plugins.title.color = "black";


const CountryContainer = () => {
  
  //Hocks
    const [countries, setCountries] = useState([]);
    //UseState for End_Year
    const [selectedYear, setSelectedYear] = useState('');
    //UseState for Sector
    const [selectedSector, setSelectedSector] = useState('');
    //UseState for Country
    const [selectedCountry, setSelectedCountry] = useState('India');
  
    useEffect(() => {
      // Fetch data from your local API endpoint
      fetch('http://localhost:8080/data/api') 

      //Promise Chain 
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);


  //Fetch Data like End_Year, Sector, Country all Data column should not be empty.
  
    const filteredCountries = countries.filter((country) => {
      return (
        (selectedYear === '' || country.end_year === selectedYear) &&
        (selectedSector === '' || country.sector === selectedSector) &&
        (selectedCountry === '' || country.country === selectedCountry) &&
        country.end_year && country.country && country.sector
      );
    });
  

    //Onchange Event Handler
    const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
    };
  
    const handleSectorChange = (event) => {
      setSelectedSector(event.target.value);
    };
  
    const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
    };
  
    const countryOptions = [
      'Arabia','Greece','Sweden','Poland','India','Nigeria','Venezuela','Germany','Panama','Libya',
      'Botswana','Ireland','Equatorial Guinea','New Zealand','Latvia','Turkey','Pakistan','Guyana','Mexico',
      'South Sudan','Austria','Belgium','South Africa','Taiwan','Chile','North Korea','Russia','Italy',
      'United Arab Emirates','France','Bahrain','Indonesia','Brazil','South Korea','Qatar','Yemen',
      'Estonia','Afghanistan'
    ];

    const Sectors=["Information Technology","Manufacturing","Financial services","Energy","Retail",
    "Support services","Government","Transport","Food & agriculture","Media & entertainment"];


  
    return (
      <div>
        <h1 className="CI">Country Information</h1>
        <div>

        
          <label className="F1">
            Filter by Year:
            &nbsp;&nbsp;&nbsp;
            <select value={selectedYear} onChange={handleYearChange} className="F1" >
              <option value="">All</option>
              {Array.from({ length: 8 }, (_, index) => 2018 + index).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          &nbsp;&nbsp;




          <label className="F2">
            Filter by Sector:
            &nbsp;&nbsp;
            <select value={selectedSector} onChange={handleSectorChange}>
            <option value="">All</option>
            {Sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
            </select>
          </label>
          &nbsp;&nbsp;





          <label className="F3">
            Filter by Country:
            &nbsp;&nbsp;
            <select value={selectedCountry} onChange={handleCountryChange} >
              <option value="">All</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        </div>
        

        <div className="article-list">
        <h1 className="artlist">Article List</h1>
        {filteredCountries.length > 0 ? (
          <div className="article-container">
            {filteredCountries.map(article => (
              <div key={article.id} className="article-card">
              <Bar
              data = {{
                labels: ["Country: "+article.country],
                datasets: [{
                  label: 'likelihood',
                  data:article.likelihood,
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF'],
                  hoverOffset: 4
                },
                {
                  label: 'Relevance',
                  data:article.relevance,
                  backgroundColor: ['#36A2EB', '#FFCE56', '#4CAF50', '#9966FF'],
                  hoverOffset: 4
                }
              ]
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Yearly progress of "+article.country+": "+article.end_year,
                  },
                },
              }}
              />
                <p>Sector: {article.sector}</p>
                <p>Topic: {article.topic.toUpperCase()}</p>
                {/* Add more fields as needed */}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">
            <p>No Data!
            No Progress!</p>
          </div>
        )}
      </div>
      
      </div>
    );
  };
  
  export default CountryContainer;
  