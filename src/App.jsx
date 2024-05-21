import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HiringDataBar from './components/HiringDataBar';
import QuarterlyData from './components/QuarterlyData';
import HalfYearlyData from './components/HalfYearlyData';
import AnnualData from './components/AnnualData';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/hiring-data-bar" element={<HiringDataBar />} />
        <Route path="/quarterly-data" element={<QuarterlyData />} />
        <Route path="/half-yearly-data" element={<HalfYearlyData />} />
        <Route path="/annually-data" element={<AnnualData />} />
      </Routes>
    </div>
  );
};

export default App;
