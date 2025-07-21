import express from 'express';
import { createTeam, addToTeam, getTeams } from '../controllers/teamController.js';
import { createTeamValidator, teamValidator } from '../validator/teamValidator.js';
const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', auth,getTeams);
router.post('/', auth, createTeamValidator , createTeam);
router.post('/add', auth, teamValidator ,addToTeam);


export default router;