import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Onboarding/CreateTeam.css";

const ShareCode = ({ teamcode }) => {

    const { code, emoji } = teamcode;
    const navigate = useNavigate();
    useEffect(() => {
        let copyButton = document.getElementById('copy-button');
        copyButton.addEventListener('click', handleCopyClick);
        return(() => {
            copyButton.removeEventListener('click', handleCopyClick);
        })
    })

    const handleCopyClick = () => {
        const codeText = document.getElementById('teamcode').textContent
        navigator.clipboard.writeText(codeText + '\n' + emoji);
    }

    return(
        <div id="display-container">
            <h1 id="text-container">Your code<br></br><code id="teamcode">{code}</code></h1>
            <div id="emoji-container">
                <h1>{emoji}</h1>
            </div>
            <div id="button-container">
                <button id="copy-button" className="button-2">Copy</button>
                <button id="next-button" className="button-2" onClick={() => {navigate('/dashboard', {replace: true})}}>➭</button>
            </div>
        </div>
    )
}

export default ShareCode;