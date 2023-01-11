import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Onboarding/JoinTeam.css";

const ShowTeam = ({ teamcode, handleJoinTeam }) => {

    const { code, emoji } = teamcode;

    // hooks
    const [team, setTeam] = useState({
        teamname: 'no team found',
        owner: 'nobody',
    });
    const navigate = useNavigate();
    useEffect(() => {
        getTeamName();
    })

    const getTeamName = async () => {
        try {
            const url = process.env.REACT_APP_SERVER_URL.concat('/getTeam')
            let team = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamcode:   teamcode.code,
                    key:        process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
                }),
            }).then(data => data.json())
            setTeam(team);
        }
        catch {
            document.getElementById('showTeam-title').textContent = 'Invalid Code';
            document.getElementById('join-button').style.display = 'none';
        }
    }

    return(
        <div id="showTeam-container">
            <h1 id="showTeam-title">Confirm Team</h1>
            <div id="showTeam-card">
                <h1 id="showTeam-teamname"><code>{team.teamname}</code></h1>
                <h3 id="showTeam-teamcode">created by:<br></br>@{team.owner}</h3>
                <h3 id="showTeam-teamcode">joining code:<br></br>{emoji}</h3>
            </div>
            <div id="button-container">
                <button id="exit-button" className="button-3" onClick={() => {navigate('/onboarding/joinTeam')}}>Exit</button>
                <button id="join-button" className="button-3" onClick={() => handleJoinTeam()}>➭</button>
            </div>
        </div>
    )
}

export default ShowTeam;