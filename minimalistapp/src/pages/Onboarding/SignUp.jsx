import './SignUp.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupQuestions } from '../../constants';
import { useEffect } from 'react';
import FormBody from '../../views/FormBody';
import { inputValidators, submitHandlers } from './validators';
import { useCookies } from 'react-cookie';

const SignUp = () => {

    // hooks
    const [fieldNumber, setFieldNumber] = useState(0);
    const { hasTeam } = useParams();
    const [formInputs, saveInput] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['session'])
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.session) {
            if(hasTeam==='1')
                navigate('/onboarding/joinTeam', {replace: true})
            else
                navigate('/onboarding/createTeam', {replace: true})
        }
    })

    // form handlers
    const handleInputChange = (event) => {
        const value = event.target.value
        inputValidators[fieldNumber](value);
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
        const session = await fetch(url, {
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
        if(session.key === process.env.REACT_APP_BACKEND_VERIFICATION_TOKEN) {
            let expiry = Math.floor(((new Date(session.expires).getTime()) - (new Date().getTime()))/1000)
            setCookie('session', session.id, { path: '/', maxAge: expiry, secure: true, sameSite: 'strict' });
            if(hasTeam==='1')
                navigate('/onboarding/joinTeam', {replace: true})
            else
                navigate('/onboarding/createTeam', {replace: true})
        }
        else {
            navigate('/onboarding');
            alert('It pains us to say there was an error. Please try again.');
        }
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