const { verifyJwt } = require("../utils/JWTverify")
const { generateJwt } = require("../utils/JwtGenerate")

// MIDDLEWARE: validar JWT (json web token)
const validateJwt = async (req, res, next) => {
    const authorization = req.header('authorization');
    if (!authorization) {
        return res.status(401).json({
            ok: false,
            msg: "No tiene autorización"
        });
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = await verifyJwt(token);
        // const renewedToken = await generateJwt({
        //     uid: payload.uid,
        //     email: payload.email,
        //     role: payload.role
        // });
        let renewedToken;
        await generateJwt({uid: payload.uid, email: payload.email, role: payload.role})
            .then((resp) => { renewedToken = resp })
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: "Error al generar el token."
                })
            })
        req.uid = payload.uid;
        req.tokenEmail = payload.email;
        req.role = payload.role;
        req.renewedToken = renewedToken;
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

module.exports = validateJwt;