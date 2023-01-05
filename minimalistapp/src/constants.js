// stores constants for easy changes

 // decides the point at which header and navbar minimize
export const scrollLimit = 100;
export const navItemsForHome = [
    {link: '#toFeatures', text: 'Features'},
    {link: '#footer', text: 'About'},
    {link: '#public-home', text: 'Top'},
];

export const navItemsForOnboarding = [
    {link: '/', text: 'Home'},
];

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

export const questions = [
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
        info:           'used for authentication',
    },
]

export const checks = {
    checkNull: (value) => {
        return value === ''? true: false;
    },
}

export const serverURL = 'http://192.168.0.101:4000';