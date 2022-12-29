import '../Navbar/Navbar.css';
import Toggle from '../Toggle/Toggle';
import { useState, useEffect } from 'react';

const Navbar = ({setTheme, isLightTheme}) => {
    const [isMenuOpen, toggleMenu] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };
    const getNavbarStyle = () => {
        let theme = isLightTheme? ' light': ' dark';
        let size = (scrollPosition > 50)? ' mini': '';
        return 'navbar'.concat(theme).concat(size);
    }
    console.log(getNavbarStyle())
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div className={getNavbarStyle()}>
            <div id='dropdown_menu'></div>
            <div id='inline_menu'>
                <a className='navlink' href="#"><h3>Top 🔝</h3></a>
                <a className='navlink' href="#"><h3>Top 🔝</h3></a>
                <a className='navlink' href="#"><h3>Top 🔝</h3></a>
            </div>
            <Toggle className='toggle' setTheme={setTheme} isLightTheme={isLightTheme}/>
        </div>
    )
}

export default Navbar;