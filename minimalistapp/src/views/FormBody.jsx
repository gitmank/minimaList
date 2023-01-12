import { useEffect } from "react";

const FormBody = ({ showField, handleInputChange, handleSubmit }) => {

    const { autofill, question, type, placeholder, info } = showField;

    // hooks
    useEffect(() => {
        const indicator = document.getElementById('password-indicator');
        indicator.addEventListener('click', showHidePass, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            indicator.removeEventListener('click', showHidePass);
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

    // event handlers\
    const showHidePass = (event) => {
        event.target.textContent = event.target.textContent==='^_^'? 'o_o':'^_^';
        event.target.style.fontSize = '20px';
        const field = document.getElementById('response-field');
        field.type = field.type==='password'? 'text': 'password';
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            handleSubmit();
    }

    return(
        <>
            <h1 id='question'>{question}</h1>
            <div id='response-area'>
            <input 
                type={type} 
                id='response-field' 
                onChange={handleInputChange} 
                maxLength='50' 
                placeholder={placeholder}
                autoComplete={autofill} 
                autoFocus/>
            <span id='info-message' className='validation-message'>{info}</span>
            <span id='error-message' className='validation-message'></span>
            </div>
            <div id='button-area'>
            <button id='password-indicator' className='button' style={{display: type==='password'? 'flex': 'none'}}><h1>{'^_^'}</h1></button>
            <button id='next-button' className='button' onClick={handleSubmit}><h1>➭</h1></button>
            </div>
        </>
    )
}

export default FormBody;