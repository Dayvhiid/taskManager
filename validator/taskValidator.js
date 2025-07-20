import {body} from 'express-validator';

const taskValidator = [
    body('title').trim().notEmpty().withMessage('Please provide a title for the task'),
    body('description').trim().notEmpty().withMessage('Please provide a description for the task')
];

export default taskValidator;