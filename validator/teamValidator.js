import {body} from 'express-validator';

const createTeamValidator = [
    body('name').trim().notEmpty().withMessage('Team Name Is Needed')
];

const teamValidator = [
    body('teamId').trim().notEmpty().withMessage('teamId field is needed'),
    body('userId').trim().notEmpty().withMessage('User Id feild is needed')
];


export {createTeamValidator, teamValidator};