import './Onboarding.css';
import { Routes, Route } from 'react-router-dom';
import AuthOptions from '../../views/AuthOptions';
import SignUp from './SignUp';
import CreateTeam from '../../views/CreateTeam';
import { useState } from 'react';

const Onboarding = ({ isLightTheme, setAuthenticatedUser, authenticatedUser, isAuthSuccess }) => {

    return(
        <>
            <div id='spacer'></div>
            <div id='onboarding-page' className={isLightTheme? 'light':'dark'}>
                <div id='onboarding-body'>
                    <Routes>
                        <Route path='/' element={
                            <AuthOptions />
                        } />
                        <Route path='/signin/*' element={<>Sign In</>} />
                        <Route path='/signup/:hasTeam/*' element={<><SignUp setAuthenticatedUser={setAuthenticatedUser}/></>} />
                        <Route path='/createTeam/*' element={<>
                            <CreateTeam 
                                isAuthSuccess={isAuthSuccess} 
                                username={authenticatedUser}
                            />
                        </>} />
                        <Route path='/joinTeam' element={<><h1>Join Team Page</h1>🚧 🦺 work in progress 🦺 🚧</>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Onboarding;