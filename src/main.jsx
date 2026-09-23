import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

// The redesign is dark-only and owns its own LanguageProvider
// (src/redesign/i18n.jsx), so the previous iteration's
// LanguageProvider / ThemeProvider wrappers are not mounted here.
// They still live in src/i18n.jsx and src/hooks/useTheme.jsx.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* Page views only, plus the "cv_download" custom event fired from the
        Contact section's download button. Free on the Hobby plan up to
        2,500 events/month; tracks counts, not who. */}
    <Analytics />
  </StrictMode>,
)
