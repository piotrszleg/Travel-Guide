import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SegmentEndForm from './pages/SegmentEndForm';
import SegmentInfoForm from './pages/SegmentInfoForm';
import Map from './pages/Map';
import LocationForm from './pages/LocationForm';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="location_form" element={<LocationForm />} />
        <Route path="/" element={<Map />} />
        <Route path="segment_end_form/:start" element={<SegmentEndForm />} />
        <Route path="segment_info_form" element={<SegmentInfoForm />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
