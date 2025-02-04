import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Layout from './Layout'
// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Layout /> */}
  </StrictMode>,
)
