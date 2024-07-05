import { getUser } from "../services/auth.js";

export const checkAuthentication = (req, res, next) => {
    const authorizationHeaderValue = req.headers['authorization']
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next()
    
    const token = authorizationHeaderValue.split("Bearer")[1]
    const user = getUser(token)

    req.user = user
    return next()
}

export const restrictTo = (roles = []) => {
    return function (req, res, next) {
        if(!req.user)  return res.redirect('/static/login')

        if(!roles.includes(req.user.role)) return res.end('UnAuthorized')

        return next()
    }
}

// export const restrictToLoggedinUserOnly = async(req, res, next) => {
//     const userUid = req.cookies?.uid; //get cookie u created with name uid
//     if(!userUid) return res.redirect('/static/login')
//     const user = getUser(userUid)
//     if(!user) return res.redirect('/static/login')

//     req.user = user
//     next()
// }

// export const checkAuth = async(req, res, next) => {
//     const userUid = req.cookies?.uid; //get cookie u created with name uid
//     const user = getUser(userUid);


//     req.user = user;
//     next();
// }