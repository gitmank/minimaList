import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinQuestions } from "../../constants";
import FormBody from "../../views/FormBody";
import './SignIn.css'
import { validationFunctions } from "./validators";

const SignIn = ({ setAuthenticatedUser }) => {

    const [count, setCount] = useState(0);
    const [data, setData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const { nullValidation } = validationFunctions;
 
    useEffect(() => {
        if(data.password) {
            authenticateUser()
        }
        const indicator = document.getElementById('password-indicator');
        indicator.addEventListener('click', showHidePass, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return(() => {
            indicator.removeEventListener('click', showHidePass);
            window.removeEventListener('keydown', handleKeyDown);
        })
    })

    const showHidePass = (event) => {
        event.target.textContent = event.target.textContent==='^_^'? 'o_o':'^_^';
        event.target.style.fontSize = '20px';
        const field = document.getElementById('response-field');
        field.type = field.type==='password'? 'text': 'password';
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            handleSubmit();
    }

    const handleSubmit = () => {
        let field = document.getElementById('response-field')
        if(!nullValidation(field.value))
            return null;
        if(count === 0) {
            setData({ username: field.value, password: '' })
            field.value = null;
            setCount(1)
        }
        if(count === 1) {
            setData({ username: data.username, password: field.value })
        }
    }

    const authenticateUser = async () => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/signin');
        try {
            const user = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN
                })
            })
            .then(response => { return response.json() });
            if(user.key === process.env.REACT_APP_BACKEND_VERIFICATION_TOKEN) {
                await setAuthenticatedUser(user.username, user._id, user.firstname)
                navigate('/dashboard', {replace: true})
                return null;
            }
            else
                throw Error;
        }
        catch {
            setCount(0);
            setData([]);    
            document.getElementById('response-field').value = ''
            document.getElementById('error-message').textContent = 'invalid credentials'
        }
    }

    return(
        <>
            <FormBody 
                handleSubmit={handleSubmit}
                handleInputChange={() => {}}
                showField={signinQuestions[count]}
            />
        </>
    )
}

export default SignIn;