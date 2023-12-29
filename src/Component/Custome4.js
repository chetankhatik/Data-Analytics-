import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index1.css';

const Customechart4 = () => {
  const [data, setData] = useState([]);
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedEndYear, setSelectedEndYear] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/data/api')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const availableSectors = [...new Set(data.map((item) => item.sector))];
  const availableEndYears = [
    ...new Set(
      data.filter((item) => item.title !== '').map((item) => item.end_year)
    ),
  ];

  const filteredData = data.filter(
    (item) =>
      (!selectedSector || item.sector === selectedSector) &&
      (!selectedEndYear || item.end_year === selectedEndYear)
  );

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setSelectedEndYear(event.target.value);
  };

  return (
    <div>
      <div className='twofilters'>
        <label htmlFor='sectorSelect'>Select Sector: </label>
        <select
          id='sectorSelect'
          value={selectedSector}
          onChange={handleSectorChange}
        >
          <option value=''>All</option>
          {availableSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor='endYearSelect'>Select End Year: </label>
        <select
          id='endYearSelect'
          value={selectedEndYear}
          onChange={handleEndYearChange}
        >
          <option value=''>All</option>
          {availableEndYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />

      <div className='articleheader'>
        <h1>Articles and Links</h1>
      </div>
      <div className='articles-container2'>
        {filteredData.length === 0 ? (
          <p>No data available</p>
        ) : (
          filteredData.map((item) => (
            <article key={item.id} className='article2'>
              <h3>Title: {item.title}</h3>
              <p>Source: {item.source}</p>
              <p>End Year: {item.end_year}</p>
              {item.url && (
                <p>
                  URL: <a href={item.url}>{item.url}</a>
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Customechart4;
