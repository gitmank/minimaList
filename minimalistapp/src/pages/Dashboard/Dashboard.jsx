import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import MySpace from './MySpace'
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
            removeCookie('session', { path: '/' })
            navigate('/onboarding', { replace: true })
        }
    }

    return(
        <>
            <Navbar  
                navItems={navItemsForDashboard}
                isLightTheme={isLightTheme}
            />
            <div style={{height: '180px'}}></div>
            <div id='dashboard-content' className={isLightTheme? 'light': 'dark'}>
            <Routes>
                <Route path='/' element={
                        <h1>hi, {authenticatedUser}</h1>
                }/>
                <Route path='/mySpace/*' element={ <MySpace /> }/>
            </Routes>
            </div>
        </>
    )
}

export default Dashboard;