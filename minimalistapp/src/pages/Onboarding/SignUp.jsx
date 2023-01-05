import './SignUp.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { questions, checks, serverURL } from '../../constants';
import { useEffect } from 'react';
import FormBody from '../../views/FormBody';

const SignUp = () => {

    const [fieldNumber, setFieldNumber] = useState(0);
    const { hasTeam } = useParams();
    const { checkNull } = checks;

    useEffect(() => {
        const indicator = document.getElementById('password-indicator');
        indicator.addEventListener('click', showHidePass, { passive: true });
        return(() => {
            indicator.removeEventListener('click', showHidePass);
        })
    })

    const setErrorMessage = (message) => {
        document.getElementById('error-message').textContent = message;
    }

    const nullValidation = (value) => {
        if(value) {
            setErrorMessage('')
            return true;
        }
        else {
            setErrorMessage('this is a required field');
            return false;
        }
    }

    const lengthValidation = (value, length) => {
        if(value.length >= length) {
            return true
        }
        else {
            setErrorMessage('must have at least ' + length + ' characters')
            return false;
        }
    }

    const mailFormatValidation = (value) => {
        if((value.includes('@')) && (value.includes('.')))
            return true;
        else {
            setErrorMessage('this does not seem valid')
            return false;
        }
    }

    const usernameAvailableValidation = async (value) => {
        const url = serverURL.concat('/userExists');
        const userExists = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: value })
        })
        .then(response => { return response.json() });
        if(userExists) {
            setErrorMessage('this username is unavailable');
            return false;
        }
        else {
            return true;
        }
    }

    const validateEmail = (value) => {
        if(nullValidation(value))
            if(lengthValidation(value, 6))
                mailFormatValidation(value)
    }
    const validateFirstname = (value) => {
        nullValidation(value);
    }
    const validateLastname = () => {
        return null;
    }
    const validateUsername = (value) => {
        if(nullValidation(value))
            if(lengthValidation(value, 6))
                usernameAvailableValidation(value)
    }
    const validatePassword = () => {
        console.log('password')
    }

    const validateInput = [validateFirstname, validateLastname, validateEmail, validateUsername, validatePassword];

    const handleInputChange = (event) => {
        const value = event.target.value
        validateInput[fieldNumber](value);
    }

    const handleSubmit = () => {
        if(fieldNumber === 4)
            setFieldNumber(0)
        else
            setFieldNumber(fieldNumber+1)
        document.getElementById('response-field').value = '';
        document.getElementById('error-message').textContent = '';
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
                showField={questions[fieldNumber]} 
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default SignUp;