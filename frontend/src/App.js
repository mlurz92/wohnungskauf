import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Documents from './pages/Documents';
import Contacts from './pages/Contacts';
import Properties from './pages/Properties';
import Appointments from './pages/Appointments';
import Login from './pages/Login';

const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/finance" element={token ? <Finance /> : <Navigate to="/login" />} />
          <Route path="/documents" element={token ? <Documents /> : <Navigate to="/login" />} />
          <Route path="/contacts" element={token ? <Contacts /> : <Navigate to="/login" />} />
          <Route path="/properties" element={token ? <Properties /> : <Navigate to="/login" />} />
          <Route path="/appointments" element={token ? <Appointments /> : <Navigate to="/login" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;