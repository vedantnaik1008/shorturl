import jwt from 'jsonwebtoken'  //stateless


const secret = "vedant$123@$"; //this need to be completely secret
export function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secret)//payload and secret
}

export function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret); //we will verify the token with our secret key
    } catch (error) {
        return null;
    }
}