import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import hiringData from '../data/hiringdata.json';
import './styles/AnnualData.css';

const AnnualData = () => {
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    updateAnnualData(startYear, endYear);
  }, [startYear, endYear]);

  const handleStartYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setStartYear(year);
    if (year > endYear) {
      setEndYear(year);
    }
  };

  const handleEndYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setEndYear(year);
    if (year < startYear) {
      setStartYear(year);
    }
  };

  const updateAnnualData = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      if (hiringData.data[year]) {
        const total = Object.values(hiringData.data[year]).reduce((sum, hires) => sum + hires, 0);
        years.push({ year, total });
      }
    }

    setChartOptions({
      chart: {
        type: 'column',
      },
      title: {
        text: `Annual Hiring Data from ${startYear} to ${endYear}`,
      },
      xAxis: {
        categories: years.map(y => y.year.toString()),
        title: {
          text: 'Year',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Hires',
        },
      },
      series: [
        {
          name: 'Hires',
          data: years.map(y => y.total),
        },
      ],
    });
  };

  return (
    <div className="annual-data-container">
      <h1>Meridian Annual Hiring Data</h1>
      <div className="year-selection">
        <label>
          Start Year:
          <select className="year-dropdown" value={startYear} onChange={handleStartYearChange}>
            {Object.keys(hiringData.data).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label>
          End Year:
          <select className="year-dropdown" value={endYear} onChange={handleEndYearChange}>
            {Object.keys(hiringData.data).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="annual-data-chart">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnnualData;
