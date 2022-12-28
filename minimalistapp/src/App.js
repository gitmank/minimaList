import logo from './minimaList_logo.png';
import './App.css';
import Tilt from 'react-parallax-tilt';
import './ParallaxEffect.scss';
import MouseParticles from "react-mouse-particles";

function App() {
  return (
    <div className="App">
        <MouseParticles
          g={1}
          color="black"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={6}
        />
      <header className="App-header">
        <Tilt className="parallax-effect" perspective={500}>
          <img src={logo} className="App-logo" alt="logo" />
        </Tilt>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          clickety
        </a>
      </header>
    </div>
  );
}

export default App;
