const signup = async(req, res, bcrypt, User) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let hashedPassword = await getHashedPassword(bcrypt, req.body.password);

    let temp = new User({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        created: new Date(),
    })
    temp.save((error, data) => {
        if (!error)
            res.status(200).send(JSON.stringify(data));
        else
            res.status(400).end('invalid');
    })
}

const setSession = async(req, res, Session) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let sesssionID = await getSessionID();
    let expires = new Date(new Date().setDate(new Date().getDate() + 15));
    let temp = new Session({
        id: sesssionID,
        expires: expires,
        lastUsed: new Date(),
        username: req.body.username
    })

    temp.save((error, data) => {
        if (!error)
            res.status(200).send(JSON.stringify(data));
        else
            res.status(400).end('invalid');
    })
}

const checkUserExists = async(req, res, User) => {
    console.log(req.body.username)
    const data = await User.findOne({ username: req.body.username }, );
    if (data)
        res.status(200).end('1');
    else
        res.status(200).end('0');
}

const checkTeamCodeExists = async(req, res, Team) => {
    console.log(req.body.teamcode)
    const data = await Team.findOne({ teamcode: req.body.teamcode }, );
    if (data)
        res.status(200).end('1');
    else
        res.status(200).end('0');
}

module.exports = {
    signup: signup,
    setSession: setSession,
    checkUserExists: checkUserExists,
    checkTeamCodeExists: checkTeamCodeExists,
}

// not for export
const getHashedPassword = async(bcrypt, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
const getSessionID = async() => {
    return (
        await fetch(process.env.RANDOM_STRING_API).then((data) => { return data.json() })
    )
}