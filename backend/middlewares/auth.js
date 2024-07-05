import { getUser } from "../services/auth.js";


export const restrictToLoggedinUserOnly = async(req, res, next) => {
    const userUid = req.cookies?.uid; //get cookie u created with name uid
    if(!userUid) return res.redirect('/static/login')
    const user = getUser(userUid)
    if(!user) return res.redirect('/static/login')

    req.user = user
    next()
}

export const checkAuth = async(req, res, next) => {
    const userUid = req.cookies?.uid; //get cookie u created with name uid
    const user = getUser(userUid);


    req.user = user;
    next();
}