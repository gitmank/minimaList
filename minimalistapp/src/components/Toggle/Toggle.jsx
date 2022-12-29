import './Toggle.css'

const Toggle = ({setTheme, isLightTheme}) => {
    return(
        <>
            <label className="switch">
                <input type="checkbox" onChange={() => {setTheme(!isLightTheme)}}></input>
                <span className="slider"></span>
            </label>
        </>
    )
}

export default Toggle;