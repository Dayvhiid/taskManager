import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        const token = authHeader.split(' ')[1]; // Fixed: added space in split
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }
}

export default auth;