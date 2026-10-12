import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { AuthProvider } from './contexts/AuthContext';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
