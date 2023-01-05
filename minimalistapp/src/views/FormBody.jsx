

const FormBody = ({ showField, handleInputChange, handleSubmit, indicatorBackground }) => {
    const { autofill, question, type, placeholder, info } = showField;
    return(
        <>
            <h1 id='question'>{question}</h1>
            <div id='response-area'>
            <input 
                type={type} 
                id='response-field' 
                onChange={handleInputChange} 
                maxLength='25' 
                placeholder={placeholder}
                autoComplete={autofill} 
                autoFocus/>
            <span id='info-message' className='validation-message'>{info}</span>
            <span id='error-message' className='validation-message'></span>
            </div>
            <div id='button-area'>
            <button id='password-indicator' className='button' style={{display: type==='password'? 'flex': 'none'}}><h1>{'-_-'}</h1></button>
            <button id='next-button' className='button' onClick={handleSubmit}><h1>➭</h1></button>
            </div>
        </>
    )
}

export default FormBody;