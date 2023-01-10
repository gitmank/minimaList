const signup = async(req, res, bcrypt, User) => {
    if (req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let hashedPassword = await getHashedPassword(bcrypt, req.body.password);

    let temp = new User({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        created: new Date(),
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

    const req_username = req.body.username
    const req_password = req.body.password

    const user = await User.findOne({ username: req_username });
    if (!user) {
        res.status(400).end('invalid username or password');
        return;
    }

    const match = await bcrypt.compare(req_password, user.password);
    if (match) {
        let user_data = {
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email
        };

        let res_data = JSON.stringifty({
            authStatus: true,
            userData: user_data
        });
        res.status(200).send(res_data);
    } else {
        res.status(400).end('invalid username or password');
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