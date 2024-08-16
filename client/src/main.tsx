import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (
    process.env.NODE_ENV === 'development' &&
    Boolean(import.meta.env.VITE_DEV_MOCKS) === true
  ) {
    const { worker } = await import('./test/browser.ts');
    worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
