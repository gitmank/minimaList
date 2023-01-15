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

const verifySession = async (req, res, Session, User) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }

    let session = await Session.findOne(
        { id: req.body.sessionID }
    )
    if(!session) {
        res.status(404).end('invalid');
        return null;
    }

    const isSessionValid = new Date().getTime() < new Date(session.expires).getTime();
    if(!isSessionValid) {
        res.status(403).end('invalid');
        return null;
    }

    let data = await User.findOne(
        { username: session.username }
    )

    if(!data) {
        res.status(404).end('invalid');
        return null;
    }

    await Session.findOneAndUpdate(
        { id: session.id },
        { lastUsed: new Date() }
    )

    const { username, firstname } = data;

    let user = JSON.stringify({
        username: username,
        firstname: firstname,
        id: data._id,
        key: process.env.BACKEND_VERIFICATION_TOKEN,
    })
    
    res.status(200).end(user);
}

const deleteSession = async (req, res, Session) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }

    Session.findOneAndDelete(
        { id: req.body.sessionID },
        (error, data) => {
            if(!error)
                res.status(200).end();
            else
                res.status(404).end('invalid');
        }
    )
}

module.exports = {
    setSession:     setSession,
    verifySession:  verifySession,
    deleteSession:  deleteSession,
}

// not for export
const getSessionID = async () => {
    return(
        await fetch(process.env.RANDOM_STRING_API).then((data) => { return data.json() })
    )
}