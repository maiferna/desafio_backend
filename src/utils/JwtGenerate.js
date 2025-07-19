const jwt = require('jsonwebtoken');

// UTIL: generate JWT (jsonwebtoken, auth)
const generateJwt = async ({ uid, email, role }) => {
    /* try {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const payLoad = { uid, email, role };
        var token = jwt.sign(payLoad, privateKey, { expiresIn: "2h" })
        return token;
    } catch (error) {
        throw error;
    } */

    return new Promise((resolve, reject) => {
        const payload = { uid, email, role };
        const privateKey = process.env.PRIVATE_KEY_JWB;
        jwt.sign(payload, privateKey,
            {
                expiresIn: '2h'
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error al generar el token');
                }
                resolve(token);
            }
        )
    })
}

module.exports = { generateJwt }