import { indicatorStyles } from "../../constants";

const validationFunctions = {
    nullValidation: (value) => {
        if(value) {
            setErrorMessage('')
            return true;
        }
        else {
            setErrorMessage('this is a required field');
            return false;
        }
    },

    lengthValidation: (value, length) => {
        if(value.length >= length) {
            return true
        }
        else {
            setErrorMessage('must have at least ' + length + ' characters')
            return false;
        }
    },   

    mailFormatValidation: (value) => {
        if((value.includes('@')) && (value.includes('.')))
            return true;
        else {
            setErrorMessage('this does not seem valid')
            return false;
        }
    },

    usernameAvailableValidation: async (value) => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/usernameExists');
        const userExists = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: value, 
                key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
            })
        })
        .then(response => { return response.json() });
        if(userExists) {
            setErrorMessage('this username is unavailable');
            return false;
        }
        else {
            return true;
        }
    },
    findPasswordStrength: (value) => {
        var score = 0;
        var lowercase = 0, uppercase = 0, specials = 0, numbers = 0;
        for(let i = 0; i < value.length; i++) {
            let code = value[i].codePointAt();
            if((code>=65) && (code<=90))
                uppercase++;
            else if((code>=97) && (code<=122))
                lowercase++;
            else if('!@#$%^&*-_=+?'.includes(value[i]))
                specials++;
            else if((code>=48) && (code<=57))
                numbers++;
        };
        if(value.length >= 8)
            score++;
        if(value.length >= 12)
            score++;
        if(lowercase > 0)
            score++;
        if(uppercase > 0)
            score++;
        if(specials > 0)
            score++;
        if(numbers > 0)
            score++
        if(score < 5)
            setErrorMessage('use both cases, symbols and numbers');
        else
            setErrorMessage('');
        return score;
    }
}

const { 
    nullValidation, 
    lengthValidation, 
    mailFormatValidation, 
    usernameAvailableValidation, 
    findPasswordStrength } = validationFunctions;

export const inputValidators = [
    (value) => {
        nullValidation(value);
    },

    () => {
        return null;
    },

    (value) => {
        if(nullValidation(value))
            if(lengthValidation(value, 6))
                mailFormatValidation(value)
    },

    (value) => {
        if(nullValidation(value))
            if(lengthValidation(value, 6))
                usernameAvailableValidation(value)
    },

    (value) => {
        const strength = findPasswordStrength(value);
        const indicator = document.getElementById('password-indicator');
        switch(strength) {
            case 0:
            case 1:
                indicator.style.background = indicatorStyles[0];
                break;
            case 2:
            case 3:
                indicator.style.background = indicatorStyles[1];
                break;
            case 4:
                indicator.style.background = indicatorStyles[2];
                break;
            case 5:
                indicator.style.background = indicatorStyles[3];
                break;
            case 6:
                indicator.style.background = indicatorStyles[4];
                break;
            default:
                indicator.style.background = indicatorStyles[0];
                break;
        }
    }
]

export const submitHandlers = [
    (value) => {
        return nullValidation(value);
    },

    () => {
        return true;
    },

    (value) => {
        if(!nullValidation(value))
            return false
        if(!lengthValidation(value, 6))
            return false
        if(!mailFormatValidation(value))
            return false
        return true
    },

    async (value) => {
        if(!nullValidation(value))
            return false
        if(!lengthValidation(value, 6))
            return false
        const isAvailable = await usernameAvailableValidation(value)
        if(!isAvailable)
            return false
        return true
    },

    (value) => {
        const strength = findPasswordStrength(value);
        if(strength > 4)
            return true
        return false
    }
]

// not for export
const setErrorMessage = (message) => {
    document.getElementById('error-message').textContent = message;
}