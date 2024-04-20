const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ msg: 'Missing token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded && decoded.id) {
                req.userId = decoded.id;
                next();
        } else {
            return res.status(403).json({ msg: "Incorrect token" });
        }
    } catch (error) {
        return res.status(403).json({ msg: 'Unkown error has occured' });
    }
}

module.exports = auth