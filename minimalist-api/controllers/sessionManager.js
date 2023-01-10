const setSession = async (req, res, bcrypt, Session) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }

    let sesssionID = await getSessionID();
    let expires = new Date(new Date().setDate(new Date().getDate() + 7));
    let temp = new Session({
        id:         sesssionID,
        expires:    expires,
        lastUsed:   new Date(),
        username:   req.body.username
    })

    temp.save((error, data) => {
        if(!error) {
            res.status(200).send(JSON.stringify(data));
        }
        else 
            res.status(400).end('invalid');
    })
}

module.exports = {
    setSession: setSession,
}

// not for export
const getSessionID = async () => {
    return(
        await fetch(process.env.RANDOM_STRING_API).then((data) => { return data.json() })
    )
}