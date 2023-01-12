import '../Navbar/Navbar.css';
import { useState, useEffect } from 'react';
import { scrollLimit } from '../../constants';

const Navbar = ({ isLightTheme, navItems }) => {

    // hooks
    const [isMenuOpen, toggleMenu] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

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

    // returns class name for styling
    const getClassForStyling = (className) => {
        let theme = isLightTheme? ' light': ' dark';
        let size = (scrollPosition > scrollLimit)? ' mini': '';
        return className.concat(theme).concat(size);
    }

    return(
        <div className='navbar-container'>
            <div className={getClassForStyling('navbar')} id='fixed-part-of-navbar'>
                <div id='dropdown-menu'>
                    <label className='pluscross-switch'>
                        <input type="checkbox" 
                                className='pluscross-checkbox' 
                                onChange={() => toggleMenu(!isMenuOpen)} 
                        />
                        <span className='pluscross-text'></span>
                    </label>
                </div>
                <div id='inline-menu'>
                {   // return navItems specific to the page
                    navItems.map((item, index) => {
                        return(
                            <a className='navlink' href={item.link} key={index}>
                                <h3>{item.text}</h3>
                            </a>
                        )
                    })
                }
                </div>
            </div>
            <div id='collapsible-part-of-navbar' 
                className={getClassForStyling('collapsibleMenu')} 
                style={{display: isMenuOpen? 'flex': 'none'}}>
                {   // return navItems specific to the page
                    navItems.map((item, index) => {
                        return(
                            <a className='navlink' href={item.link} key={index}>
                                <h3>{item.text}</h3>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Navbar;