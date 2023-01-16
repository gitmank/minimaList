// stores constants for easy changes

// decides the point at which header and navbar minimize
export const scrollLimit = 100;


// nav items to be shown in navbar on different pages
export const navItemsForHome = [
    {link: '/dashboard', text: 'Dashboard'},
    {link: '#toFeatures', text: 'Features'},
    {link: '#footer', text: 'About'},
    {link: '#public-home', text: 'Top'},
];

export const navItemsForOnboarding = [
    {link: '/', text: 'Home'},
    {link: '/dashboard', text: 'Dashboard'},
];

export const navItemsForDashboard = [
    {link: '/dashboard', text: 'Dashboard'},
    {link: '/dashboard', text: 'Teams '},
    {link: '/dashboard', text: 'Tasks'},
    {link: '/dashboard/mySpace', text: 'MySpace'},
    {link: '/dashboard', text: '⚙️'},
    {link: '/logout', text: 'Logout'},
];


// for home page features
export const professions = [
    {text: 'collaboration tool for everyone', emoji: '👩🏽 👨🏻 🧑🏻 🧔🏾‍♂️ 👩🏻'},
    {text: 'collaboration tool for developers', emoji: '👩🏽‍💻 👨🏻‍💻 🧑🏻‍💻 👨🏾‍💻 👩🏻‍💻'},
    {text: 'collaboration tool for students', emoji: '👩🏽‍🎓 👨🏻‍🎓 🧑🏻‍🎓 👨🏽‍🎓 👩🏻‍🎓'},
    {text: 'collaboration tool for lawyers', emoji: '👩🏽‍💼 👨🏻‍💼 🧑🏻‍💼 👨🏾‍💼 👩🏻‍💼'},
    {text: 'collaboration tool for doctors', emoji: '👩🏽‍⚕️ 👨🏻‍⚕️ 🧑🏻‍⚕️ 👨🏾‍⚕️ 👩🏻‍⚕️'},
    {text: 'yes, chefs can use it too!', emoji: '👩🏽‍🍳 👨🏻‍🍳 🧑🏻‍🍳 👨🏽‍🍳 👩🏻‍🍳'},
]

export class professionsList {
    constructor() {
        this.head = {
            data: professions[0],
            next: null,
        }
        this.one = {
            data: professions[1],
            next: null,
        }
        this.two = {
            data: professions[2],
            next: null,
        }
        this.three = {
            data: professions[3],
            next: null,
        }
        this.four = {
            data: professions[4],
            next: null,
        }
        this.five = {
            data: professions[5],
            next: null,
        }
        this.head.next = this.one;
        this.one.next = this.two;
        this.two.next = this.three;
        this.three.next = this.four;
        this.four.next = this.five;
        this.five.next = this.head;
    }
}

// for onboarding page options
const privacyPoints = [
    'no analytics data will be collected', 
    'cookies are optional', 
    'valid credentials required',
    'valid email required',
    'team code required',
    'manage teams from dashboard',
    'you will be team admin'
]

export const authOptions = [
    {
        title: 'Sign In', 
        text: 'for existing users',
        privacyList: [
            privacyPoints[0], 
            privacyPoints[1], 
            privacyPoints[2],
            privacyPoints[5]
        ],
        color: 'aqua',
    },
    {
        title: 'Join a team', 
        text: 'for new users with a code',
        privacyList: [
            privacyPoints[0], 
            privacyPoints[1], 
            privacyPoints[3], 
            privacyPoints[4]
        ],
        color: 'hotpink',
    },
    {
        title: 'Create a team', 
        text: 'for new users without a code',
        privacyList: [
            privacyPoints[0], 
            privacyPoints[1], 
            privacyPoints[3],
            privacyPoints[6]
        ],
        color: 'yellow',
    },
]


// form questions
export const signupQuestions = [
    {
        type:           'text',
        autofill:      'given-name',
        question:       'What is your first name?',
        placeholder:    'first name',
        required:       true,
        info:           'only shown to team members',
    },
    {
        type:           'text',
        autofill:      'family-name',
        question:       'What is your last name?',
        placeholder:    'last name',
        required:       false,
        info:           'this is optional',
    },
    {
        type:           'text',
        autofill:      'email',
        question:       'What is your email ID?',
        placeholder:    'email',
        required:       true,
        info:           'we promise not to spam',
    },
    {
        type:           'text',
        autofill:      'off',
        question:       'Pick a unique username',
        placeholder:    'username',
        required:       true,
        info:           'used to identify you in the app',
    },
    {
        type:           'password',
        autofill:      'new-password',
        question:       'Set a strong password',
        placeholder:    'password',
        required:       true,
        info:           'tap the ^_^ button to view',
    },
]

export const createTeamQuestions = [
    {
        type:           'text',
        autofill:       'none',
        question:       'Name your team',
        placeholder:    'team name',
        required:       true,
        info:           'this can be your project name',
    },
]

export const signinQuestions = [
    {
        type:           'text',
        autofill:       'username',
        question:       'Your unique username',
        placeholder:    'username',
        required:       true,
        info:           'used to identify you in the app',
    },
    {
        type:           'password',
        autofill:       'current-password',
        question:       'Your password',
        placeholder:    'password',
        required:       true,
        info:           'tap the ^_^ button to view',
    },
]


// password strength colors
export const indicatorStyles = [
    'linear-gradient(to right, rgb(255, 64, 19), rgb(255, 106, 0))',
    'linear-gradient(to right, rgb(255, 106, 0), rgb(255, 170, 0))',
    'linear-gradient(to right, rgb(255, 170, 0), rgb(254, 199, 0))',
    'linear-gradient(to right, rgb(254, 199, 0), rgb(217, 235, 55))',
    'linear-gradient(to right, rgb(217, 235, 55), rgb(119, 187, 65))',
]

// to generate team code
export const teamcodeItems = [
    ['zero ','one ', 'two ','three ','four ','five ','six ','seven ', 'eight ', 'nine '],

    ['happy ','sad ','funny ','angry ','sleepy '],

    ['purple ','red ','blue ','green ','yellow ','orange '],

    [
        'cats ', 'dogs ', 'owls ', 'koalas ', 'pandas ', 'foxes ', 'wolves ', 'zebras ', 'bats ', 'whales ', 
        'bulbs ', 'discs ', 'phones ', 'coins ', 'gems ', 'keys ', 'pins ', 'dice ', 'pills ', 'cars '
    ],
]

export const teamcodeEmoji = [
    ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],

    ['😀', '😔', '🤪', '😠', '😪'],

    ['🟣', '🔴', '🔵', '🟢', '🟡', '🟠'],

    [
        '🐱', '🐶', '🦉', '🐨', '🐼', '🦊', '🐺', '🦓', '🦇', '🐋', 
        '💡', '💿', '📱', '🪙', '💎', '🔑', '🧷', '🎲', '💊', '🚗'
    ],
]

export const generateTeamcode = () => {
    let code = ''
    let emoji = '';
    let index = 0;
    for(let i = 0; i < 4; i++) {
      index = Math.floor((Math.random() * teamcodeItems[i].length))
      code += (teamcodeItems[i][index])
      emoji += (teamcodeEmoji[i][index])
    }
    return {
      code: code,
      emoji: emoji,
    }
}

export const verifySession = async (sessionID) => {
    const url = process.env.REACT_APP_SERVER_URL.concat('/verifySession');
    const user = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            sessionID: sessionID,
            key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
        })
    }).then(response => { return response.json() })
    if(user.key === process.env.REACT_APP_BACKEND_VERIFICATION_TOKEN) {
        return user.username;
    }
    else {
        throw Error
    }
}