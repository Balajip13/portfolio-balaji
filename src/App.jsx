import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import DeveloperBackground from './components/ui/DeveloperBackground';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/console-portal');

  return (
    <div className="app">
      {!isAdminPath && <DeveloperBackground />}
      {!isAdminPath && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/console-portal" element={<AdminLogin />} />
          <Route 
            path="/console-portal/dashboard/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
