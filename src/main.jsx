// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { Provider } from 'react-redux';
import { store } from './data/store'; // On va le créer
import App from './App';
import './index.css';

Sentry.init({
  dsn: "https://4ddf9ea81f50dd43c8a2a0eeddd3451d@o4510835089997824.ingest.de.sentry.io/4510835096813648", // À récupérer sur sentry.io
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);