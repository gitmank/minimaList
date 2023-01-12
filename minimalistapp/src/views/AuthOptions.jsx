import { useState } from 'react';
import '../pages/Onboarding/Onboarding.css';
import { authOptions } from '../constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthOptions = () => {

    // hooks
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown, {passive: true});

        return(() => {
            window.removeEventListener('keydown', handleKeyDown);
        });
    })

    // event handlers
    const handleKeyDown = (event) => {
        if(event.key === 'ArrowLeft')
            decrementCount();
        if(event.key === 'ArrowRight')
            incrementCount();
        if(event.key === 'Enter')
            handleCardClick();
    }
    const handleCardClick = () => {
        if(count === 0)
            navigate('/onboarding/signin', { replace: false })
        else if(count === 1)
            navigate('/onboarding/signup/1', { replace: false })
        else if(count === 2)
            navigate('/onboarding/signup/0', { replace: false })
    }

    // supporting functions
    const incrementCount = () => {
        if(count < 2)
            setCount(count + 1)
        else
            setCount(0)
    }
    const decrementCount = () => {
        if(count > 0)
            setCount(count - 1)
        else
            setCount(authOptions.length - 1)
    }

    return(
        <div id='view-container'>
            <div id='page-title'>
                <h1>Click on a card to get started!</h1>
            </div>
            <div id="card-container">
                <div id='card-back' className='cardnav' onClick={decrementCount}>
                    <h6>➭</h6>
                </div>
                <div id='card-deck' onClick={handleCardClick} style={{ backgroundColor: authOptions[count].color }}>
                    <div id='card'>
                        <h3 id="card-title">{ authOptions[count].title }</h3>
                        <p id='card-text'>{ authOptions[count].text }</p>
                        <h4>Privacy info</h4>
                        <ul id='privacy-list'>
                            {
                                authOptions[count].privacyList.map((item, index) => {
                                    return(
                                        <li key={index}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div id='card-front' className='cardnav' onClick={incrementCount}>
                    <h6>➭</h6>
                </div>
            </div>
        </div>
    )
}

export default AuthOptions;