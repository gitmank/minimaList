const getMySpace = async (req, res, MySpaceTasks, Session) => {
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

    let data = await MySpaceTasks.findOne(
        { username: session.username },
    )
    if(data) {
        res.status(200).end(JSON.stringify(data))
    }
    else {
        res.status(404).end('invalid');
    }
}

const updateMySpace = async (req, res, MySpaceTasks, Session) => {
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

    let data = await MySpaceTasks.findOneAndUpdate(
        { username: session.username },
        { tasks: JSON.parse(req.body.tasks) },
    )
    if(!data) {
        let temp = new MySpaceTasks({
            username: session.username,
            tasks: JSON.parse(req.body.tasks)
        })
        data = await temp.save();
    }
    res.status(200).end('OK')
}

module.exports = {
    getMySpace:     getMySpace,
    updateMySpace:  updateMySpace,
}