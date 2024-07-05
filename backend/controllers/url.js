import { URL } from '../models/url.js'
import { generateRandomString } from '../randomId.js';

export const handleGenerateNewShortURL = async(req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortID = generateRandomString(8);
    await URL.create({
        shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {id: shortID,});
}

export const handleGetShortURL = async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        { shortID: shortID },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        }
    );

    res.redirect(entry?.redirectURL);
}

export const handleGetAnalytics = async (req, res) => {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory,})
}

export const handleGetAllURL = async (req, res) => {
    const result = await URL.find({});
    return res.json(result);
}
