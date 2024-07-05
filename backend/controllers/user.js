import { User } from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../services/auth.js";

export const handleUserSignup = async(req, res) => {
    const {name, email, password} = req.body

    await User.create({
        name, email, password
    })

    return res.render('home')
}

export const handleUserLogin = async (req, res) => {
   const { email, password } = req.body;

   const user =  await User.findOne({
        email,
        password
    });

    if(!user) return res.render('login', {
        error: "Invalid Username or Password",
    })


    const token = setUser(user);
    res.cookie("token", token) //create cookie with name and id
    return res.redirect('/static/frontend');
};