import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import KlantDetails from './pages/KlantDetails';
import KlantInvoer from './pages/KlantInvoer';
import WerkbonAanmaken from './pages/WerkbonAanmaken';
import Instellingen from './pages/Instellingen';
import { useUser } from './contexts/UserContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/klant/:id" element={
                <ProtectedRoute>
                  <KlantDetails />
                </ProtectedRoute>
              } />
              <Route path="/klant-invoer" element={
                <ProtectedRoute>
                  <KlantInvoer />
                </ProtectedRoute>
              } />
              <Route path="/werkbon-aanmaken" element={
                <ProtectedRoute>
                  <WerkbonAanmaken />
                </ProtectedRoute>
              } />
              <Route path="/instellingen" element={
                <ProtectedRoute>
                  <Instellingen />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;