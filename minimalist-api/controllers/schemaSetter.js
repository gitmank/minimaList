const mongoose = require('mongoose');

const setUserSchema = () => {
    let userSchema = new mongoose.Schema({
        username:   { type: String, required: true, minLength: 5, maxLength: 20, unique: true },
        password:   { type: String, required: true, maxLength: 100 },
        name:       { type: String, default: JSON.stringify({ first: 'anon', last: '' }) },
        email:      { type: String, maxLength: 50 },
        verified:   { type: Boolean, default: false },
        created:    { type: Date, default: new Date() },
        teams:      { type: Array, default: [] },
    })
    
    let User = mongoose.model("users", userSchema);

    return User;
}

const setAPIkeySchema = () => {
    let APIkeySchema = new mongoose.Schema({
        key:        { type: String }, 
        expires:    { type: Date }, 
        created:    { type: Date }, 
        timesUsed:  { type: Number, default: 0 },
        username:   { type: String },
    })

    let APIkey = mongoose.model('keys', APIkeySchema)

    return APIkey;
}

const setSessionSchema = () => {
    let sessionSchema = new mongoose.Schema({
        id:         { type: String, length: 16 }, 
        expires:    { type: Date }, 
        lastUsed:   { type: Date },
        username:   { type: String },
    })

    let Session = mongoose.model('sessions', sessionSchema)

    return Session;
}

const setTaskSchema = () => {
    let taskSchema = new mongoose.Schema({
        username:       { type: String },
        teamname:       { type: String },
        taskname:       { type: String, required: true },
        isCompleted:    { type: Boolean, default: false },
        isUrgent:       { type: Boolean, default: false },
    })

    let Task = mongoose.model("tasks", taskSchema);

    return Task;
}

const setTeamSchema = () => {
    let teamSchema = new mongoose.Schema({
        teamname:   { type: String, minLength: 8, maxLength: 40, required: true },
        teamcode:   { type: String },
        owner:      { type: String, required: true },
        members:    { type: Array, default: [] },
    })

    let Team = mongoose.model("teams", teamSchema);

    return Team;
}

const setHourSchema = () => {
    let hourSchema = new mongoose.Schema({
        username: { type: String },
    })

    let Hour = mongoose.model("hours", hourSchema);

    return Hour;
}

module.exports = {
    setUserSchema:      setUserSchema,
    setTaskSchema:      setTaskSchema,
    setTeamSchema:      setTeamSchema,
    setHourSchema:      setHourSchema,
    setAPIkeySchema:    setAPIkeySchema,
    setSessionSchema:   setSessionSchema,
}