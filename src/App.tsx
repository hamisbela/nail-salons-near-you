import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AddListingPage from './pages/AddListingPage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* React-managed routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/add-a-listing" element={<Layout><AddListingPage /></Layout>} />
        
        {/* Static content routes - serve the HTML files directly */}
        <Route path="/salon/:slug/*" element={null} />
        <Route path="/cities/:slug/*" element={null} />
        <Route path="/cities" element={null} />
        <Route path="/states/:slug/*" element={null} />
        <Route path="/states" element={null} />
        <Route path="/categories/:slug/*" element={null} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;