import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ResumeBuilder from './components/ResumeBuilder';
import LiveInterview from './components/LiveInterview';
import CareerAgent from './components/CareerAgent';
import MockExams from './components/MockExams';
import Auth from './components/Auth';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth status on load
  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <DashboardLayout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<ResumeBuilder />} />
          <Route path="/interview" element={<LiveInterview />} />
          <Route path="/exams" element={<MockExams />} />
          <Route path="/agent" element={<CareerAgent />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
