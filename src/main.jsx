import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The redesign is dark-only and owns its own LanguageProvider
// (src/redesign/i18n.jsx), so the previous iteration's
// LanguageProvider / ThemeProvider wrappers are not mounted here.
// They still live in src/i18n.jsx and src/hooks/useTheme.jsx.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
