
const EmojiForm = ({ emojiArray, handleClick }) => {
    return(
        <>
            <h1 id="emoji-title">Tap emoji to form teamcode</h1>
            <div id="emoji-button-container">
                {
                    emojiArray.map((emoji, index) => {
                        return(
                            <button 
                                id={index} 
                                key={index} 
                                className='emoji-button' 
                                onClick={handleClick}>
                                    {emoji}
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default EmojiForm;