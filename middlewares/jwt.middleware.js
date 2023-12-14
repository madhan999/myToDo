const constants = require("../utils/constants")
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSECRETKEY
const authenticateToken = () => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: constants.errors.authenticationError});
        }
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
              }
              req.user = user;
              next();
        } )
    }
}

module.exports = {
    authenticateToken
}