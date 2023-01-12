import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header'
import { useState } from 'react';
import Onboarding from './pages/Onboarding/Onboarding';
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  // hooks
  const [isLightTheme, setTheme] = useState();

  return (
    <>
        <Header 
          setTheme={setTheme} 
          isLightTheme={isLightTheme} 
        />

        <Routes>
          <Route  
            path='/' 
            element={<Home isLightTheme={isLightTheme} />}
          />
          <Route 
            path='/onboarding/*' 
            element={<Onboarding isLightTheme={isLightTheme} />} 
          />
          <Route 
            path='/dashboard/*' 
            element={<Dashboard isLightTheme={isLightTheme} />} 
          />
          <Route 
            path='/*'
            // replace with NOT FOUND page
            element={<><div style={{height: '200px'}}></div><h1>Not found</h1></>}
          />
        </Routes>
    </>
  );
}

export default App;
