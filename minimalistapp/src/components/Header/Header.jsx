import logo from '../../resources/minimaList_logo.png';
import Tilt from 'react-parallax-tilt';
import './Header.css'
import { useState, useEffect } from 'react';
const Header = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <header className={(scrollPosition>50)? 'header mini':'header'}>
            <Tilt
                className="parallax-effect-img"
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope={true}
            >
                <img src={logo} className={(scrollPosition>50)? 'logo mini':'logo'} alt="minimalist logo" />
            </Tilt>
            <h1 className={(scrollPosition > 50)? 'title mini':'title'}>minimaList</h1>
        </header>
    );
}
export default Header;