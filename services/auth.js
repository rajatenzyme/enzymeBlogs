const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role,
    };

    const token = JWT.sign(payload, secret, {expiresIn: 30000});
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}