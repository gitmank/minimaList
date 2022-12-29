import image from '../resources/placeholderimage.png';
import './Home.css'

const Home = () => {
    return(
        <div id='public-home'>
            <div className='home-spacer'></div>
            <img src={image} alt=""></img>
            <img src={image} alt=""></img>
        </div>
    )
}

export default Home;