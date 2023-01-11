import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import { navItemsForHome, navItemsForOnboarding, navItemsForDashboard } from './constants';
import Onboarding from './pages/Onboarding/Onboarding';
import { useCookies } from 'react-cookie';
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  // hooks
  const [isLightTheme, setTheme] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAuthSuccess, setAuthStatus] = useState(false);
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [name, setName] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  // adding event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  });

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
    const url = process.env.REACT_APP_SERVER_URL.concat('/getSessionID');
    const session = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          username: authenticatedUsername,
          key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
      })
    }).then(response => { return response.json() })
    let expiry = Math.floor(((new Date(session.expires).getTime()) - (new Date().getTime()))/1000)
    setCookie('session', session.id, { path: '/', maxAge: expiry });
  }

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
              <Onboarding 
                isLightTheme={isLightTheme} 
                setAuthenticatedUser={setAuthenticatedUser}
                authenticatedUser={username}
                isAuthSuccess={isAuthSuccess}
              />
            </>
          } />
          <Route path='/dashboard' element={
            <>
              <Navbar  
              navItems={navItemsForDashboard}
              isLightTheme={isLightTheme} 
              scrollPosition={scrollPosition}
              />
              <Dashboard 
                isLightTheme={isLightTheme}
                cookies={cookies}
                removeCookie={removeCookie}
              />
            </>
          } />
        </Routes>
    </div>
  );
}

export default App;
