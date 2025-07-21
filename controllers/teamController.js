import Team from '../models/Team.js';

const createTeam = async (req, res) => {
    const { name } = req.body;
    try {
        const team = await Team.create({
            name,
            creator: req.user.id,
            members: [req.user.id] 
        });
        res.status(201).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ members: req.user.id }).populate('members', 'name email').populate('creator', 'name email');
        res.status(200).json({ success: true, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

const addToTeam = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }
        if (team.members.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User already in team' });
        }
        team.members.push(userId);
        await team.save();
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export { createTeam, getTeams, addToTeam };