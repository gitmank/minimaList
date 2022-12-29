import './App.css';
import MouseParticles from "react-mouse-particles";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useState } from 'react';

function App() {
  const [isLightTheme, setTheme] = useState(false);
  return (
    <div className="App">
        {/* <MouseParticles
          g={1}
          color="black"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={6}
        /> */}
        <Header />
        <Navbar setTheme={setTheme} isLightTheme={isLightTheme}/>
        <Routes>
          <Route path='/' element={<Home isLightTheme={isLightTheme}/>}></Route>
          <Route path='/test' element={<>Works</>}></Route>
        </Routes>
    </div>
  );
}

export default App;
