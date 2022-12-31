import '../Navbar/Navbar.css';
import { useState } from 'react';

const Navbar = ({ isLightTheme, scrollPosition, navItems }) => {

    // stored states
    const [isMenuOpen, toggleMenu] = useState(0);

    // returns class name for styling
    const getClassForStyling = (className) => {
        let theme = isLightTheme? ' light': ' dark';
        let size = (scrollPosition > 100)? ' mini': '';
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