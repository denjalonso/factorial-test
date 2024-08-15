import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (
    process.env.NODE_ENV === 'development' &&
    import.meta.env.DEV_MOCKS === true
  ) {
    const { worker } = await import('./test/browser');

    return worker.start({
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
