import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>,
    </BrowserRouter>
  </ThemeProvider>
)
