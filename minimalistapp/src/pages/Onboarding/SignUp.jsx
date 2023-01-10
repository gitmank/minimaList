import './SignUp.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupQuestions } from '../../constants';
import { useEffect } from 'react';
import FormBody from '../../views/FormBody';
import { inputValidators, submitHandlers } from './validators';

const SignUp = ({ setAuthenticatedUser }) => {

    // hooks
    const [fieldNumber, setFieldNumber] = useState(0);
    const { hasTeam } = useParams();
    const [formInputs, saveInput] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const indicator = document.getElementById('password-indicator');
        indicator.addEventListener('click', showHidePass, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return(() => {
            indicator.removeEventListener('click', showHidePass);
            window.removeEventListener('keydown', handleKeyDown);
        })
    })

    const handleInputChange = (event) => {
        const value = event.target.value
        inputValidators[fieldNumber](value);
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            handleSubmit();
    }

    const handleSubmit = async () => {
        const value = document.getElementById('response-field').value;
        const allValid = await submitHandlers[fieldNumber](value);
        if(!allValid) {
            return false;
        }
        const temp = formInputs;
        temp.push(value);
        saveInput(temp);
        if(fieldNumber === 4)
            handleFormSubmission();
        else
            setFieldNumber(fieldNumber+1)
        document.getElementById('response-field').value = '';
        document.getElementById('error-message').textContent = '';
    }

    const handleFormSubmission = async () => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/signup');
        const user = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                firstname: formInputs[0],
                lastname: formInputs[1],
                email: formInputs[2],
                username: formInputs[3],
                password: formInputs[4],
                key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN
            })
        })
        .then(response => { return response.json() });
        if(user === 'invalid') {
            navigate(0);
            alert('It pains us to say there was an error. Please try again.');
        }
        else {
            setAuthenticatedUser(user.username, user._id, user.firstname)
            if(hasTeam==='1')
                navigate('/onboarding/joinTeam', {replace: true})
            else
                navigate('/onboarding/createTeam', {replace: true})
        }
    }

    const showHidePass = (event) => {
        event.target.textContent = event.target.textContent==='-_-'? 'o_o':'-_-';
        event.target.style.fontSize = '20px';
        const field = document.getElementById('response-field');
        field.type = field.type==='password'? 'text': 'password';
    }

    return(
        <div id='question-container'>
            <FormBody 
                showField={signupQuestions[fieldNumber]} 
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default SignUp;