const jwt = require('jsonwebtoken');

// UTIL: generate JWT (jsonwebtoken, auth)
const generateJwt = async ({ uid, email, role }) => {
    try {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const playLoad = { uid, email, role };
        var token = jwt.sign(playLoad, privateKey, { expiresIn: "2h" })
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = { generateJwt }