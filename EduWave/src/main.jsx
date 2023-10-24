import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TeacherProvider } from './context/Teacher.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TeacherProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TeacherProvider>
  </React.StrictMode>,
)
