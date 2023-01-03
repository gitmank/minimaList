const mongoose = require('mongoose')

const setUserSchema = () => {
    let userSchema = new mongoose.Schema({
        username: { type: String },
    })
    
    let User = mongoose.model("users", userSchema);

    return User;
}

const setTaskSchema = () => {
    let taskSchema = new mongoose.Schema({
        username: { type: String },
    })

    let Task = mongoose.model("tasks", taskSchema);

    return Task;
}

const setTeamSchema = () => {
    let teamSchema = new mongoose.Schema({
        username: { type: String },
    })

    let Team = mongoose.model("teams", teamSchema);

    return Team;
}

module.exports = {
    setUserSchema: setUserSchema,
    setTaskSchema: setTaskSchema,
    setTeamSchema: setTeamSchema,
}