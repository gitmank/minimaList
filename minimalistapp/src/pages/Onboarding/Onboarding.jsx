import './Onboarding.css';
import { Routes, Route } from 'react-router-dom';
import AuthOptions from '../../views/AuthOptions';
import SignUp from './SignUp';
import SignIn from './SignIn';
import CreateTeam from './CreateTeam';
import JoinTeam from './JoinTeam';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import { navItemsForOnboarding } from '../../constants';

const Onboarding = ({ isLightTheme }) => {

    return(
        <>
            <Navbar  
                navItems={navItemsForOnboarding}
                isLightTheme={isLightTheme} 
            />
            <div id='spacer'></div>
            <div id='onboarding-page' className={isLightTheme? 'light':'dark'}>
                <div id='onboarding-body'>
                    <Routes>
                        <Route path='/' element={ <AuthOptions /> } />

                        <Route path='/signin/*' element={ <SignIn /> } />

                        <Route path='/signup/:hasTeam/*' element={ <SignUp /> } />

                        <Route path='/createTeam/*' element={ <CreateTeam /> } />

                        <Route path='/joinTeam/*' element={ <JoinTeam /> } />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Onboarding;