import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
