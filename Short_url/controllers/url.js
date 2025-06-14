const URL = require('../models/Url');

async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    const { nanoid } = await import('nanoid'); //package used to generate short id's
    const id =  nanoid(8);
    const shortIds = id;
    if(!body || !(body.url)){
        return res.status(400).json("Url is required");
    }
    await URL.create({
        shortId : shortIds,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })
    return res.render("home" , {"generatedUrl" : `localhost:8000/url/${shortIds}`})
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


async function handleAllUrls(req,res){
    const user = req.user._id;
    console.log(user);
    const allUrls = await URL.find({createdBy : user});
    return res.render('allUrls',{"allUrls" : allUrls});
}

module.exports = { handleGenerateNewShortUrl , handleAnalytics, handleRedirectToUrl, handleAllUrls};