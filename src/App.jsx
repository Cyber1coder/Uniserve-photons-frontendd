import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ServiceSearchPage from './pages/ServiceSearchPage';
import FloatingAIChat from './components/FloatingAIChat';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideChat = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {children}
      {!hideChat && <FloatingAIChat />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search/:category" element={<ServiceSearchPage />} />
          
          {/* Fallback to Login for prototype */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;