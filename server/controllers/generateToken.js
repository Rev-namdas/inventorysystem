const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: 30 }
    )
}

module.exports = generateAccessToken;