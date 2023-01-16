import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { signinQuestions, verifySession } from "../../constants";
import FormBody from "../../views/FormBody";
import './SignIn.css'
import { validationFunctions } from "./validators";

const SignIn = ({ setAuthenticatedUser }) => {

    const { nullValidation } = validationFunctions;

    // hooks
    const [firstInput, setInput] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const navigate = useNavigate();
 
    useEffect(() => {
        if(cookies.session)
            recoverSession()
        else 
            navigate('/onboarding/signin/username', { replace: true })
    }, [])

    // supporting functions
    const recoverSession = async () => {
        try {
            await verifySession(cookies.session);
            navigate('/dashboard', { replace: true });
        }
        catch {
            removeCookie('session');
            navigate('/onboarding/signin/username', { replace: true })
        }
    }

    const authenticateUser = async (data) => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/signin');
        try {
            const session = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN
                })
            })
            .then(response => { return response.json() });
            if(session.key === process.env.REACT_APP_BACKEND_VERIFICATION_TOKEN) {
                let expiry = Math.floor(((new Date(session.expires).getTime()) - (new Date().getTime()))/1000)
                setCookie('session', session.id, { path: '/', maxAge: expiry });
                navigate('/dashboard', {replace: true});
            }
            else
                throw Error;
        }
        catch {
            resetForm()
        }
    }

    // form handlers
    const submitUsername = (event) => {
        let field = document.getElementById('response-field');
        if(!nullValidation(field.value))
            return null;
        setInput(field.value)
        field.value = null;
        navigate('/onboarding/signin/password', { replace: true })  
    }

    const submitPassword = async (event) => {
        let field = document.getElementById('response-field');
        if(!nullValidation(field.value))
            return null;
        let inputs = {
            username: firstInput,
            password: field.value,
        }
        document.getElementById('next-button').style.display = 'none';
        await authenticateUser(inputs);
    }

    const handleInputChange = (event) => {
        nullValidation(event.target.value)
    }

    const resetForm = () => {
        navigate('/onboarding/signin/username')
        document.getElementById('next-button').style.display = 'flex';
        setInput('');    
        document.getElementById('response-field').value = ''
        document.getElementById('error-message').textContent = 'invalid credentials'
    }

    return(
        <>
            <Routes>
                <Route path="/username" element={
                    <FormBody 
                        handleSubmit={submitUsername}
                        handleInputChange={handleInputChange}
                        showField={signinQuestions[0]}
                    />
                }/>
                <Route path="/password" element={
                    <FormBody 
                        handleSubmit={submitPassword}
                        handleInputChange={handleInputChange}
                        showField={signinQuestions[1]}
                    />
                }/>
            </Routes>
        </>
    )
}

export default SignIn;