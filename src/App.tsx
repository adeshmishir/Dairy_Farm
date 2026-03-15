import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import WeCare from './pages/WeCare';
import About from './pages/About';
import Products from './pages/Products';
import PhotoGallery from './pages/PhotoGallery';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50/50 via-white to-green-100/30">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/we-care" element={<WeCare />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<PhotoGallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
