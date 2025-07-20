import express from 'express';
import { registerValidator, loginValidator } from '../validator/authValidators.js';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);

export default router;