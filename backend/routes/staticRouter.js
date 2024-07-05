import express from 'express'
import { URL } from '../models/url.js';
import { restrictTo } from '../middlewares/auth.js';

export const router = express.Router()

router.get('/frontend', restrictTo(["NORMAL"]), async(req, res)=> {
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allUrls
    })
})

router.get("/signup", (req, res)=> {
    return res.render('signup')
})

router.get('/login', (req, res)=> {
    return res.render('login')
});
