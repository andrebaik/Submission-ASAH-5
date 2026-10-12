import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/login"
            element={(
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/register"
            element={(
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/archives"
            element={(
              <ProtectedRoute>
                <ArchivePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/new"
            element={(
              <ProtectedRoute>
                <AddPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/:id"
            element={(
              <ProtectedRoute>
                <DetailPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
