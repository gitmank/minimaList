import './Onboarding.css';
import { Routes, Route } from 'react-router-dom';
import AuthOptions from '../../views/AuthOptions';
import SignUp from './SignUp';
import { useState } from 'react';

const Onboarding = ({ isLightTheme, setAuthenticatedUser }) => {

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
                        <Route path='/createTeam' element={<><br></br><br style={{margin: '500px'}}></br>Create Team Page<br></br>🚧 🦺 work in progress 🦺 🚧</>} />
                        <Route path='/joinTeam' element={<><br></br><br style={{margin: '500px'}}></br>Join Team Page<br></br>🚧 🦺 work in progress 🦺 🚧</>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Onboarding;