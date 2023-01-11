import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ isLightTheme, cookies, removeCookie }) => {

    // hooks
    const navigate = useNavigate();
    const [authenticatedUser, setUser] = useState();
    const [firstname, setName] = useState();

    useEffect(() => {
        verifySession()
    })

    const verifySession = async () => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/verifySession');
        try {
            const user = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    sessionID: cookies.session,
                    key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
                })
            }).then(response => { return response.json() })
            if(user.key === process.env.REACT_APP_BACKEND_VERIFICATION_TOKEN) {
                recoverSession(user);
            }
            if(!user) {
                navigate('/onboarding', { replace: true })
            }
        }
        catch {
            console.log('no session recovered')
            removeCookie('session')
            navigate('/onboarding', { replace: true })
        }
    }

    const recoverSession = (user) => {
        const { username, firstname } = user;
        setUser(username);
        setName(firstname);
    }

    return(
        <>
            <div style={{height: '200px'}}></div>
            <div id='placeholder'>
                <h1>DASHBOARD - {authenticatedUser}</h1>
                <h1>🚧 🦺 work in progress 🦺 🚧</h1>
            </div>
        </>
    )
}

export default Dashboard;