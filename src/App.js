// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReservationView from './Components/ReservationView';
import DashboardView from './Components/DashboardView';


const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/reservation">Reservation</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/reservation" element={<ReservationView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
