import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from "./UserContext"
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </Router>
  </UserContextProvider>,
)
