import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import SalesChart from './SalesChart';
import hiringData from '../data/hiringdata.json';
import './styles/HiringDataBar.css';

const monthMap = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

const HiringDataBar = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleDateChange = (startDate, endDate) => {
    const filtered = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      if (hiringData.data[year]) {
        const months = Object.keys(hiringData.data[year]);
        months.forEach(month => {
          const date = new Date(`${year}-${monthMap[month]}-01`);
          if (date >= startDate && date <= endDate) {
            filtered.push({ date: `${year}-${month}`, value: hiringData.data[year][month] });
          }
        });
      }
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleDateChange(new Date('2010-01-01'), new Date('2024-12-31'));
  }, []);

  return (
    <div className="dashboard">
      <h1>Meridian Hiring Dashboard</h1>
      <DateRangePicker onDateChange={handleDateChange} />
      <div className="sales-chart">
        <SalesChart data={filteredData} />
      </div>
    </div>
  );
};

export default HiringDataBar;
