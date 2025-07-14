
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { getI18n } from './i18n';
import './index.css';
import './global.css';
import { Loader2 } from 'lucide-react';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <Loader2 className="w-12 h-12 animate-spin text-cow-purple" />
    <p className="text-white/80">Initializing...</p>
  </div>
);

root.render(
  <React.StrictMode>
    <LoadingFallback />
  </React.StrictMode>
);

getI18n()
  .then((i18n) => {
    root.render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error('Failed to initialize i18n, check main.tsx', err);
    root.render(
      <React.StrictMode>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-500">Error Initializing Application</h1>
          <p className="mb-4 text-white/80">{(err as Error).message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white rounded-md bg-cow-purple hover:bg-cow-purple/80 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </React.StrictMode>
    );
  });
