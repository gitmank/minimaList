import './Home.css'

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
                    <p>Crush your goals, we'll take care of the rest!</p>
                    <a href="/onboarding" className={isLightTheme? 'light': 'dark'}>Create a team ➮</a>
                </div>
            </div>
        </div>
    )
}

export default Home;