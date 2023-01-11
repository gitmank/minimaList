const signup = async(req, res, bcrypt, User) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let hashedPassword = await getHashedPassword(bcrypt, req.body.password);

    let temp = new User({
        username:   req.body.username,
        password:   hashedPassword,
        firstname:  req.body.firstname,
        lastname:   req.body.lastname,
        email:      req.body.email,
        created:    new Date(),
    })
    temp.save((error, data) => {
        if (!error) {
            let user = JSON.stringify({
                id: data._id,
                username: data.username,
                firstname: data.firstname,
                key: process.env.BACKEND_VERIFICATION_TOKEN,
            })
            res.status(200).send(user)
        } else
            res.status(400).end(JSON.stringify('invalid'));
    })
}


const signin = async(req, res, bcrypt, User) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }

    const { username, password } = req.body;

    const data = await User.findOne({ username: username });
    if (!data) {
        res.status(404).end('invalid');
        return null;
    }

    const passwordsMatch = await bcrypt.compare(password, data.password);
    if (passwordsMatch) {
        let user = JSON.stringify({
            username: data.username,
            firstName: data.firstname,
            id: data._id,
            key: process.env.BACKEND_VERIFICATION_TOKEN,
        });
        res.status(200).send(user);
    } 
    else {
        res.status(403).end('invalid');
    }
};


const checkUserExists = async(req, res, User) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    const data = await User.findOne({ username: req.body.username }, );
    if (data)
        res.status(200).end('1');
    else
        res.status(200).end('0');
}

module.exports = {
    signup: signup,
    signin: signin,
    checkUserExists: checkUserExists,
}

// not for export
const getHashedPassword = async(bcrypt, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}