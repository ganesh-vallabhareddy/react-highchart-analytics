import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import hiringData from '../data/hiringdata.json';
import './styles/QuarterlyData.css';

const quarters = [
  { name: 'Q1 (Jan-Mar)', months: ['January', 'February', 'March'] },
  { name: 'Q2 (Apr-Jun)', months: ['April', 'May', 'June'] },
  { name: 'Q3 (Jul-Sep)', months: ['July', 'August', 'September'] },
  { name: 'Q4 (Oct-Dec)', months: ['October', 'November', 'December'] },
];

const QuarterlyData = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    updateQuarterlyData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    updateQuarterlyData(year);
  };

  const updateQuarterlyData = (year) => {
    if (!hiringData.data[year]) return;

    const data = quarters.map(quarter => {
      const total = quarter.months.reduce((sum, month) => sum + (hiringData.data[year][month] || 0), 0);
      return { name: quarter.name, y: total };
    });

    setChartOptions({
      chart: {
        type: 'column',
      },
      title: {
        text: `Quarterly Hiring Data for ${year}`,
      },
      xAxis: {
        categories: quarters.map(quarter => quarter.name),
        title: {
          text: 'Quarter',
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
    <div className="quarterly-data-container">
      <h1>Meridian Quarterly Hiring Data</h1>
      <select className="year-dropdown" value={selectedYear} onChange={handleYearChange}>
        {Object.keys(hiringData.data).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <div className="quarterly-data-chart">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default QuarterlyData;
