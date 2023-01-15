import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const Logout = () => {

    // hooks
    const [cookies, setCookie, removeCookie] = useCookies(['session'])
    const navigate = useNavigate();
 
    useEffect(() => {
        if(cookies.session)
            logout()
        else 
            navigate('/')
    }, [])

    const logout = async () => {
        try {
            await deleteSession(cookies.session);
            removeCookie('session', { path: '/' });
            navigate('/');
        }
        catch {
            removeCookie('session');
            navigate('/')
        }
    }

    const deleteSession = async (sessionID) => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/deleteSession');
        fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionID: sessionID,
                key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
            })
        })
    }

    return(
        <><div style={{height: '200px'}}></div>LOGGED OUT</>
    )
}

export default Logout;