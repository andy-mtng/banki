import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './RouteSwitch';
import { AuthContextProvider } from './context/AuthContext'
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouteSwitch class="bg-gray-100" />
    </AuthContextProvider>
  </React.StrictMode>
);


