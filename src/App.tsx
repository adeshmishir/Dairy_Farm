import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './lib/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PhotoGallery from './pages/PhotoGallery';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Landing from './pages/Landing';
import { useEffect } from 'react';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Check if it's the first visit to show the landing page
const getIsFirstVisit = () => !localStorage.getItem('hasVisited');

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GoogleOAuthProvider clientId="1073775678759-fofaj6715du6pbc8o98vt0sct8o5r5b6.apps.googleusercontent.com">
        <AuthProvider>
          <Routes>
            {/* Landing page — full-screen, no nav/footer */}
            <Route path="/landing" element={<Landing />} />

            {/* Main app with navigation */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen flex flex-col bg-[#02110b]">
                  <Navigation />
                  <main className="flex-1">
                    <Routes>
                      <Route
                        path="/"
                        element={getIsFirstVisit() ? <Navigate to="/landing" replace /> : <Home />}
                      />
                      <Route path="/about" element={<About />} />
                      <Route path="/gallery" element={<PhotoGallery />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/admin" element={<Admin />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Toaster position="top-right" richColors />
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
