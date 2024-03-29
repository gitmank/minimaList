import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTeam.css';
import { validationFunctions } from './validators';
import FormBody from '../../views/FormBody';
import ShareCode from '../../views/ShareCode';
import { Route, Routes } from 'react-router-dom';
import { generateTeamcode, createTeamQuestions, verifySession } from '../../constants'
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const CreateTeam = () => {

    const { nullValidation } = validationFunctions;

    // hooks
    const [displayCode, setCode] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['session'])
    const [username, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.session)
            recoverSession()
        else 
            navigate('/onboarding/signin/username', { replace: true })
    }, [])

    const recoverSession = async () => {
        try {
            let temp = await verifySession(cookies.session);
            setUser(temp);
        }
        catch {
            removeCookie('session');
            navigate('/onboarding/signin/username', { replace: true })
        }
    }
    const generateUniqueCode = async () => {
        let newcode = '';
        let i = 0;
        while(true) {
            if(i > 10) {
                newcode = {
                    code: Math.floor(Math.random()*1000000),
                    emoji: '⚠️',
                }
                break;
            }
            i++;
            newcode = generateTeamcode();
            const url = process.env.REACT_APP_SERVER_URL.concat('/teamcodeExists');
            const teamcodeExists = await fetch(url, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  teamcode: newcode.code,
                  key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
              })
            }).then(response => { return response.json() })
            if(!teamcodeExists)
                break;
        }
        setCode(newcode);
        return newcode;
    }

    const registerTeamcode = async (username, teamcode, teamname) => {
        const url = process.env.REACT_APP_SERVER_URL;
        await fetch(url.concat('/createTeam'), {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              teamcode: teamcode.code,
              username: username,
              teamname: teamname,
              key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
          })
        })
        await fetch(url.concat('/joinTeam'), {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                teamcode: teamcode.code,
                username: username,
                key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
            })
        })
    }

    const handleSubmit = async () => {
        let value = document.getElementById('response-field').value;
        if(!nullValidation(value))
            return undefined;
        const teamcode = await generateUniqueCode();
        await registerTeamcode(username, teamcode, value);
        navigate('/onboarding/createTeam/shareCode', { replace: true });
    }

    return(
        <div id='createTeam-form'>
            <Routes>
                <Route path='/' element={
                    <FormBody 
                        showField={createTeamQuestions[0]} 
                        handleInputChange={() => {}}
                        handleSubmit={handleSubmit}
                    />
                } />
                <Route path='/shareCode' element={
                    <ShareCode teamcode={displayCode} />
                } />
            </Routes>
        </div>
    )
}

export default CreateTeam;