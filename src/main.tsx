import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// #region agent log
fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:6',message:'Main entry point executing',data:{pathname:window.location.pathname,href:window.location.href,hasRoot:!!document.getElementById('root')},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H3,H5'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
