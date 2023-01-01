import { Link } from 'react-router-dom';
import './Home.css';
import teamnamesOne from '../resources/teamnames-one.png';
import paneThreeImage from '../resources/task-division.png';
import { professions, professionsList } from '../constants';
import { useState, useEffect } from 'react';

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
        <div id='public-home'>
            <div className='home-spacer'></div>
            <div id='hero-pane' className={isLightTheme? 'light': 'dark'}>
                <div id='hero-text'>
                    <span className='title-span'>
                        <h3>climb </h3>
                        <h2>that </h2>
                        <h1>pea<span>k.</span></h1>
                    </span>
                    <p className='hero-secondary-text'>Crush your goals, we'll take care of the rest 🫡</p>
                    <p className='hero-small-text'>Create a team. Assign tasks. Mark as ✅<br></br>It's that simple!</p>
                    <h3 id='hero-CTA' className={isLightTheme? 'light': 'dark'}>
                            <Link id='toFeatures' className='CTA-link' to='/onboarding'>Create a team ➮</Link>
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

            </div>
        </div>
    )
}

export default Home;