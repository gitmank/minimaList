import { useEffect, useState } from 'react';
import './JoinTeam.css'
import { teamcodeEmoji, teamcodeItems, verifySession } from '../../constants';
import EmojiForm from '../../views/EmojiForm';
import ShareCode from '../../views/ShareCode';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ShowTeam from '../../views/ShowTeam';
import { useCookies } from 'react-cookie';

const JoinTeam = () => {

    // hooks
    const [indexes, setIndexes] = useState([]);
    const [emojicode, setEmoji] = useState([]);
    const [count, setCount] = useState(0);
    const [teamcode, setTeamCode] = useState();
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

    const handleClick = (event) => {
        let temp = indexes;
        temp.push(event.target.id);
        setIndexes(temp);
        temp = emojicode;
        temp.push(event.target.textContent);
        setEmoji(temp);
        if(count === 3) {
            resetForm();
            submitCode({ code: indexes, emoji: emojicode.join(' ') });
            return null;
        }
        setCount(count+1)
    }

    const resetForm = () => {
        setCount(0)
        setIndexes([])
        setEmoji([])
        setTeamCode();
    }

    const submitCode = (teamcode) => {
        setTeamCode(convertEmojiToText(teamcode));
        navigate('/onboarding/joinTeam/confirmTeam')
    }

    const convertEmojiToText = (teamcode) => {
        let temp = teamcode.code.map((item, index) => {
            return teamcodeItems[index][item]
        })
        teamcode.code = temp.join('')
        return teamcode;
    }

    const handleJoinTeam = async () => {
        try {
            const url = process.env.REACT_APP_SERVER_URL.concat('/joinTeam')
            let temp = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username:   username,
                    teamcode:   teamcode.code,
                    key:        process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
                }),
            })
            navigate('/dashboard', { replace: true })
        }
        catch {
            alert('oopsie! we could not add you to this team');
            navigate('/dashboard', { replace: true })
        }
    }

    return(
        <>
            <Routes>
                <Route path='/' element={
                    <EmojiForm 
                        emojiArray={teamcodeEmoji[count]}
                        handleClick={handleClick}
                    />
                } />
                <Route path='/confirmTeam' element={
                    <ShowTeam 
                        teamcode={teamcode}
                        handleJoinTeam={handleJoinTeam}
                    />
                } />
            </Routes>
        </>
    )
}

export default JoinTeam;