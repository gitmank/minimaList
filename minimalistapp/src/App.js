import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import { navItemsForHome } from './constants';

function App() {
  // stored states
  const [isLightTheme, setTheme] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  // event handlers
  const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
  };

  // adding event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
        <Header 
          setTheme={setTheme} 
          isLightTheme={isLightTheme} 
          scrollPosition={scrollPosition}
        />
        <Routes>
          <Route path='/' element={
            <>
              <Navbar 
                isLightTheme={isLightTheme} 
                scrollPosition={scrollPosition} 
                navItems={navItemsForHome}
              />
              <Home isLightTheme={isLightTheme}/>
            </>}>
          </Route>
          <Route path='/onboarding' element={
            <>
              <Navbar  
                navItems={navItemsForHome}
                isLightTheme={isLightTheme} 
                scrollPosition={scrollPosition}/>
            </>
          }></Route>
        </Routes>
    </div>
  );
}

export default App;
