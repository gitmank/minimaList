import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useState } from 'react';

function App() {
  const [isLightTheme, setTheme] = useState();
  return (
    <div className="App">
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
