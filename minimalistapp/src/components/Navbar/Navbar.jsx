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
        let size = (scrollPosition > 100)? ' mini': '';
        return 'navbar'.concat(theme).concat(size);
    }
    const getMenuStyle = () => {
        let theme = isLightTheme? ' light': ' dark';
        let size = (scrollPosition > 100)? ' mini': '';
        return 'collapsibleMenu'.concat(theme).concat(size);
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div className='navbar-container'>
            <div className={getNavbarStyle()} id='fixed_part_of_navbar'>
                <div id='dropdown_menu'>
                    <label className='pluscross-switch'>
                        <input type="checkbox" className='pluscross-checkbox' onChange={() => toggleMenu(!isMenuOpen)} />
                        <span className='pluscross-text'></span>
                    </label>
                </div>
                <div id='inline_menu'>
                    <a className='navlink' href="#feature_one"><h3>Features</h3></a>
                    <a className='navlink' href="#footer"><h3>About</h3></a>
                    <a className='navlink' href="#public-home"><h3>Top</h3></a>
                </div>
                <Toggle className='toggle' setTheme={setTheme} isLightTheme={isLightTheme}/>
            </div>
            <div id='collapsible_part_of_navbar' className={getMenuStyle()} style={{display: isMenuOpen? 'flex': 'none'}}>
                <a className='navlink' href="#feature_one"><h3>Features</h3></a>
                <a className='navlink' href="#footer"><h3>About</h3></a>
                <a className='navlink' href="#public-home"><h3>Top</h3></a>
            </div>
        </div>
    )
}

export default Navbar;