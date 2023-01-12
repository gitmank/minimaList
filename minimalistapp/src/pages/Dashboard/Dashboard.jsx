import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import { navItemsForDashboard, verifySession } from '../../constants';
import './Dashboard.css';

const Dashboard = ({ isLightTheme }) => {

    // hooks
    const navigate = useNavigate();
    const [authenticatedUser, setUser] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['session'])

    useEffect(() => {
        if(cookies.session)
            recoverSession()
        else
            navigate('/onboarding')
    })

    const recoverSession = async () => {
        try {
            setUser(await verifySession(cookies.session))
        }
        catch {
            console.log('no session recovered')
            removeCookie('session')
            navigate('/error', { replace: true })
        }
    }

    return(
        <>
            <Navbar  
                navItems={navItemsForDashboard}
                isLightTheme={isLightTheme}
            />
            <div style={{height: '200px'}}></div>
            <div id='placeholder'>
                <h1>DASHBOARD - {authenticatedUser}</h1>
                <h1>🚧 🦺 work in progress 🦺 🚧</h1>
            </div>
        </>
    )
}

export default Dashboard;