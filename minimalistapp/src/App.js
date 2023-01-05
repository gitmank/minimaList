import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import { navItemsForHome, navItemsForOnboarding } from './constants';
import Onboarding from './pages/Onboarding/Onboarding';
import { useCookies } from 'react-cookie';

function App() {
  // stored states
  const [isLightTheme, setTheme] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAuthSuccess, setAuthStatus] = useState(false);
  const [cookies, setCookie] = useCookies(['session']);
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [name, setName] = useState('');

  // event handlers
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const setAuthenticatedUser = async (authenticatedUsername, authSecret, firstname) => {
    setAuthStatus(true);
    setUsername(authenticatedUsername);
    setSecret(authSecret);
    setName(firstname);
  }

  // adding event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  });

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
            </>} />
          <Route path='/onboarding/*' element={
            <>
              <Navbar  
                navItems={navItemsForOnboarding}
                isLightTheme={isLightTheme} 
                scrollPosition={scrollPosition}/>
              <Onboarding isLightTheme={isLightTheme} setAuthenticatedUser={setAuthenticatedUser}/>
            </>
          } />
        </Routes>
    </div>
  );
}

export default App;
