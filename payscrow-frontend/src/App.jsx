// App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import LandingPage from './pages/LandingPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/transactions" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
