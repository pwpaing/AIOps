import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

initializeFaro({
  // POINT THIS TO YOUR LOCAL ALLOY INSTANCE
  url: 'http://localhost:12347/collect',

  apiKey: 'secret', // Must match the api_key in config.alloy (if set)

  app: {
    name: 'faro-lab-app',
    version: '1.0.0',
    environment: 'development'
  },

  instrumentations: [
    // Load the default Web instrumentations
    ...getWebInstrumentations(),
    // Add Tracing
    new TracingInstrumentation(),
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
