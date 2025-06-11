const URL = require('../models/Url');

async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    const { nanoid } = await import('nanoid'); //package used to generate short id's
    const id =  nanoid(8);
    const shortIds = id;
    // console.log(body);
    if(!body || !(body.url)){
        return res.status(400).json("Url is required");
    }
    await URL.create({
        shortId : shortIds,
        redirectUrl : body.url,
        visitHistory : []
    })
    return res.status(201).json({ id : shortIds });
}

async function handleAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.find({shortId : shortId });
    console.log(result);
    return res.status(201).json({ "numberOfClicks: " : result[0].visitHistory.length, "history" : result[0].visitHistory});
}

async function handleRedirectToUrl(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push : {
            visitHistory : {
                timestamp : Date.now(),
            }
        }
    } )
    res.redirect(result.redirectUrl);
}
module.exports = { handleGenerateNewShortUrl , handleAnalytics, handleRedirectToUrl};