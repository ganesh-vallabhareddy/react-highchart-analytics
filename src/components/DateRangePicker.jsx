import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/DateRangePicker.css';

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = React.useState(new Date('2010-01-01'));
  const [endDate, setEndDate] = React.useState(new Date('2024-12-31'));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div className="date-picker">
      <DatePicker selected={startDate} onChange={handleStartDateChange} />
      <DatePicker selected={endDate} onChange={handleEndDateChange} />
    </div>
  );
};

export default DateRangePicker;
