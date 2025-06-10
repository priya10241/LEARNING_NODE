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

module.exports = { handleGenerateNewShortUrl };