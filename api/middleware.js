const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key';

module.exports={
    auth : (req, res, next) => {
        const authHeader = req.headers.authorization;
        // TODO: Check whether authHeader should be splitted or not
        if (!authHeader) {
            return res.status(403).json({ msg: 'Missing auth header' });
        }
        const [, token] = authHeader.split(' '); // Bearer <token>
        // TODO: token = authHeader
        if (!token) {
            return res.status(403).json({ msg: 'Missing token' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded && decoded.id) {
                    req.userId = decoded.id;
                    next();
            } else {
                return res.status(403).json({ msg: "Incorrect token" });
            }
        } catch (error) {
            return res.status(403).json({ msg: 'Invalid token' });
        }
        return null;
    }
}
