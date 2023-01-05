const createTeam = async (req, res, Team) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    let temp = new Team({
        teamname: req.body.teamname,
        teamcode: req.body.teamcode,
        owner:    req.body.username,
    })
    
    temp.save((error, data) => {
        if(!error)
            res.status(200).send(JSON.stringify(data));
        else
            res.status(400).end('invalid')
    })
}

const joinTeam = async (req, res, Team, User) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    try {
        const doc = await Team.findOne(
            { teamcode: 'seven green cats'},
        );

        if(!doc.members.includes(req.body.username)) {
            await Team.findOneAndUpdate(
                { teamcode: 'seven green cats'},
                { $push: { members: req.body.username }}
            );
            await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { teams: doc.teamname }}
            );
            res.sendStatus(200);
        }
        else
            res.status(400).end('invalid');
    }
    catch(err) {
      res.status(500).end()
    }
}

const checkTeamCodeExists = async(req, res, Team) => {
    if(req.body.key !== process.env.FRONTEND_VERIFICATION_TOKEN) {
        res.status(401).end('invalid');
        return null;
    }
    const data = await Team.findOne({ teamcode: req.body.teamcode }, );
    if (data)
        res.status(200).end('1');
    else
        res.status(200).end('0');
}

module.exports = {
    createTeam:             createTeam,
    joinTeam:               joinTeam,
    checkTeamCodeExists:    checkTeamCodeExists,
}