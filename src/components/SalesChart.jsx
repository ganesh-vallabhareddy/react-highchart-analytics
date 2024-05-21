import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles/SalesChart.css';

const SalesChart = ({ data }) => {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Hiring Data Over Time',
    },
    xAxis: {
      categories: data.map(d => d.date),
      title: {
        text: 'Date',
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
        data: data.map(d => d.value),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SalesChart;
