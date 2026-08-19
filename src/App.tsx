import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Lazy load Secondary & Legal pages
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center font-mono text-xs text-[#ff4500]">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#ff4500] animate-ping" />
        <span className="tracking-widest uppercase font-bold">LOADING TRANSMISSION...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<LegalPage initialDocId="privacy" />} />
          <Route path="/terms" element={<LegalPage initialDocId="terms" />} />
          <Route path="/cookies" element={<LegalPage initialDocId="cookies" />} />
          <Route path="/licenses" element={<LegalPage initialDocId="licenses" />} />
          <Route path="/legal/:docId" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
