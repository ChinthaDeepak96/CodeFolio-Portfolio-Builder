import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Load the application's App component (use the JS router-based App)
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
