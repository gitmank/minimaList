import './Onboarding.css';
import { Routes, Route } from 'react-router-dom';
import AuthOptions from '../../views/AuthOptions/AuthOptions';
import { useState } from 'react';

const Onboarding = ({ isLightTheme }) => {

    return(
        <>
            <div id='spacer'></div>
            <div id='onboarding-page' className={isLightTheme? 'light':'dark'}>
                <div id='onboarding-body'>
                    <Routes>
                        <Route path='/' element={
                            <AuthOptions />
                        } />
                        <Route path='/signin' element={<>Sign In</>} />
                        <Route path='/joinTeam' element={<>Join Team</>} />
                        <Route path='/createTeam' element={<>Create Team</>} />
                        <Route path='/signup' element={<>Sign Up</>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Onboarding;