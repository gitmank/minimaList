import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ isLightTheme }) => {
    console.log(isLightTheme)
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
                    <p className='hero-small-text'>Create a team. Assign tasks. Mark as completed. It's that simple!</p>
                    <h3 id='hero-CTA' className={isLightTheme? 'light': 'dark'}>
                            <Link className='CTA-link' to='/onboarding'>Create a team ➮</Link>
                    </h3>
                </div>
            </div>
            <div id='feature_one' className={isLightTheme? 'light': 'dark'}>
                <div id='featureOne-paneOne'>
                    <span className='feature-title'>Generate a quirky Team Code</span>
                </div>
                <div id='featureOne-paneTwo'></div>
            </div>
        </div>
    )
}

export default Home;