import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import hiringData from '../data/hiringdata.json';
import './styles/HalfYearlyData.css';

const halfYears = [
  { name: 'H1 (Jan-Jun)', months: ['January', 'February', 'March', 'April', 'May', 'June'] },
  { name: 'H2 (Jul-Dec)', months: ['July', 'August', 'September', 'October', 'November', 'December'] },
];

const HalfYearlyData = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    updateHalfYearlyData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    updateHalfYearlyData(year);
  };

  const updateHalfYearlyData = (year) => {
    if (!hiringData.data[year]) return;

    const data = halfYears.map(halfYear => {
      const total = halfYear.months.reduce((sum, month) => sum + (hiringData.data[year][month] || 0), 0);
      return { name: halfYear.name, y: total };
    });

    setChartOptions({
      chart: {
        type: 'column',
      },
      title: {
        text: `Half-Yearly Hiring Data for ${year}`,
      },
      xAxis: {
        categories: halfYears.map(halfYear => halfYear.name),
        title: {
          text: 'Half-Year',
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
          data: data.map(d => d.y),
        },
      ],
    });
  };

  return (
    <div className="half-yearly-data-container">
      <h1>Meridian Half-Yearly Hiring Data</h1>
      <select className="year-dropdown" value={selectedYear} onChange={handleYearChange}>
        {Object.keys(hiringData.data).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <div className="half-yearly-data-chart">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default HalfYearlyData;
