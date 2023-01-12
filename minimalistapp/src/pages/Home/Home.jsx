import { Link } from 'react-router-dom';
import './Home.css';
import teamnamesOne from '../../resources/teamnames-one.png';
import paneThreeImage from '../../resources/task-division.png';
import { navItemsForHome, professionsList } from '../../constants';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Home = ({ isLightTheme }) => {

    useEffect(() => {
        const text = document.getElementById('profession-text');
        const emoji = document.getElementById('profession-emoji');
        let list = new professionsList();
        let node = list.head;
        const interval = setInterval(() => {
            node = node.next;
            text.textContent = node.data.text;
            emoji.textContent = node.data.emoji;
        }, 1500);
        return(() => {
            clearInterval(interval);
        });
    })

    return(
        <>
            <Navbar
                isLightTheme={isLightTheme}
                navItems={navItemsForHome}
            />
            <div id='public-home'>
                <div className='home-spacer'></div>
                <div id='hero-pane' className={isLightTheme? 'light': 'dark'}>
                    <div id='hero-text'>
                        <span className='title-span'>
                            <h3>climb </h3>
                            <h2>that </h2>
                            <h1>pea<span>k.</span></h1>
                        </span>
                        <p className='hero-secondary-text'>Crush your goals, we'll take care of the rest!</p>
                        <p className='hero-small-text'>Create a team. Assign tasks. Mark as ✅<br></br>It's that simple!</p>
                        <h3 id='hero-CTA' className={isLightTheme? 'light': 'dark'}>
                                <Link id='toFeatures' className='CTA-link' to='/onboarding'>Get Started ➮</Link>
                        </h3>
                    </div>
                </div>
                <div id='features' className={isLightTheme? 'light': 'dark'}>
                    <div id='feature-pane-one' className='featurePane'>
                        <img className='paneOne-image' src={teamnamesOne} alt="sample usernames" />
                        <span className='feature-title'>You get a quirky team code<br></br>\(• ◡ •)/</span>
                    </div>
                    <div id='feature-pane-two' className='featurePane'>
                    <span id='profession-text'>collaboration tool for everyone</span>
                        <h1 id='profession-emoji'>👩🏾‍🦱 👨🏻 👩🏽 🧔🏾‍♂️ 👩🏻</h1>
                        <span className='feature-title'>The code adds them to the team<br></br>(‘-’)人(ﾟ_ﾟ)</span>
                    </div>
                    <div id='feature-pane-three' className='featurePane'>
                        <img className='paneThree-image' src={paneThreeImage} alt="task distribution" />
                        <span className='feature-title'>Pick tasks from the team board 📌</span>
                    </div>
                    <div id='feature-pane-four' className='featurePane'>
                        <span className='feature-title'>🚧 🦺 work in progress 🦺 🚧</span>
                    </div>
                </div>
                <div id='footer' className={isLightTheme? ' light': ' dark'}>
                    <div className='footer-column'>
                        <h2 className='footer-heading'>Project Info</h2>
                        <div className='footer-links-container'>
                            <h4>⎋ FAQs</h4>
                            <h4>⎋ GitHub repo</h4>
                            <h4>⎋ minimalist API</h4>
                        </div>
                    </div>
                    <div className='footer-column'>
                        <h2 className='footer-heading'>Contact Us</h2>
                        <div className='footer-links-container'>
                            <h4>⎋ Email</h4>
                            <h4>⎋ Form</h4>
                        </div>
                    </div>
                    <div className='footer-column'>
                        <h2 className='footer-heading'>Development</h2>
                        <div className='footer-links-container'>
                            <h4>⎋ Admin Account</h4>
                            <h4>⎋ Manage Data</h4>
                        </div>
                    </div>
                    <div className='footer-column'>
                        <h2 className='footer-heading'>minimaList 2023</h2>
                        <div className='footer-links-container'>
                            <h4>‣ Version 0.0.0</h4>
                            <h4>‣ Completion<br></br>| 🟠🟠⚪️⚪️⚪️ |</h4>
                        </div>
                    </div>
                </div>
                <div id='footer-credit'>made with ♡ by mank</div>
            </div>
        </>
    )
}

export default Home;