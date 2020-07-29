const User = require("./user.model");
const { internalErr, makeResponse } = require("../utils")
const jwt = require("jsonwebtoken")
const config = require("config")

const secret = config.get("session.secret");



/**
 * @function signUpUser
 * @param {Object} req 
 * @param {Object} res 
 */
const signUpUser = async ({ body: user }, res) => {
    try {
        const usr = new User(user);
        await usr.save()
        res.send(
            makeResponse(jwt.sign(
                { id: usr.id, email: usr.email },
                secret,
                { expiresIn: "7d" }
            ))
        )
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}

/**
 * unAuthorized
 * @param {Object} res 
 */
const unAuthorized = (res) => {
    res.status(401).json(makeResponse("You are not authorized", 401, "invalidAuth"))
}

/**
 * login
 * @param {Object} req
 * @param {Object} res 
 */
const login = async ({ body: { email, password } }, res) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return unAuthorized(res)
        } else {
            if (user.password === password) {
                res.send(
                    makeResponse(
                        jwt.sign(
                            { id: user.id, email: user.email },
                            secret,
                            { expiresIn: "7d" }
                        )
                    )
                )
            } else {
                return unAuthorized(res)
            }
        }
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}

// const googleOAuthURL = (_, res) => {
//     res.send(makeResponse(authURL()))
// }

// const googleOauthCallback = async ({ query: { code } }, res) => {
//     try {
//         const { email, name } = await getGoogleAccountFromCode(code)
//         const user = await User.findOne({ email })
//         if (!user) {
//             const usr = new User({ name, email });
//             await usr.save()
//             res.send({
//                 created: usr.id, token: jwt.sign(
//                     { id: usr.id, email: usr.email },
//                     secret,
//                     { expiresIn: "7d" }
//                 )
//             })
//         }
//         else {
//             res.send(
//                 makeResponse({
//                     token: jwt.sign(
//                         { id: user.id, email: user.email },
//                         secret,
//                         { expiresIn: "7d" }
//                     )
//                 })
//             )
//         }
//     } catch (error) {
//         console.log("error ::: ", error)
//         internalErr(res)
//     }
// }


module.exports = {
    signUpUser,
    login,
}