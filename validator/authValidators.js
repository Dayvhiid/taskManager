import {body} from 'express-validator';
const registerValidator =  [
    body('name').trim().notEmpty().withMessage('Please provide a name'),
    body('email').trim().isEmail().withMessage('Please input a valid email'),
    body('password').trim().notEmpty().withMessage('Please input a valid password')    
];

const loginValidator = [
    body('email').trim().isEmail().withMessage('Please provide your email'),
    body('password').trim().notEmpty().withMessage('Please provide your password')
];

export {registerValidator, loginValidator};