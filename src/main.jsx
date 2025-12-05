import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// IMPORTANTE: Importar CSS y JS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' 
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // <--- ESTA LÍNEA ES LA QUE FALTABA

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

