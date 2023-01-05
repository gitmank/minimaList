const setSession = async (req, res, bcrypt, Session, User) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let { password } = await User.findOne(
        { username: req.body.username }
    )
    let passwordsMatch = await bcrypt.compare(req.body.password, password);
    if(!passwordsMatch) {
        res.status(401).end('invalid');
        return null;
    }
    let sesssionID = await getSessionID();
    let expires = new Date(new Date().setDate(new Date().getDate() + 15));
    let temp = new Session({
        id:         sesssionID,
        expires:    expires,
        lastUsed:   new Date(),
        username:   req.body.username
    })

    temp.save((error, data) => {
        if(!error) {
            res.status(200).send(JSON.stringify(data.id));
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