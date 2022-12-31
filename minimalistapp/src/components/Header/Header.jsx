import logo from '../../resources/minimaList_logo.png';
import Tilt from 'react-parallax-tilt';
import { scrollLimit } from '../../constants';
import Toggle from '../Toggle/Toggle';
import './ToggleInHeader.css';
import './Header.css';

// Header is always rendered on all pages
const Header = ({ setTheme, isLightTheme, scrollPosition }) => {
    
    // returns class for styling
    const getClassForStyling = (className) => {
        if(scrollPosition > scrollLimit)
            return className.concat(' mini');
        else 
            return className;
    }

    return(
        <header className={getClassForStyling('header')}>
            <div className='logoNtitle'>
                <Tilt
                    className="parallax-effect-img"
                    tiltMaxAngleX={40}
                    tiltMaxAngleY={40}
                    perspective={800}
                    transitionSpeed={1500}
                    scale={1.1}
                    gyroscope={true}
                >
                    <img src={logo} className={getClassForStyling('logo')} alt="minimalist logo" />
                </Tilt>
                <h1 className={getClassForStyling('title')}>minimaList</h1>
            </div>
            <div className='toggleContainer'>
                <Toggle className='toggle' setTheme={setTheme} isLightTheme={isLightTheme}/>
            </div>
        </header>
    );
}
export default Header;