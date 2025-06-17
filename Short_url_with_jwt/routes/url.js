const express = require('express');
const {handleGenerateNewShortUrl, handleAnalytics, handleRedirectToUrl, handleUserUrls, handleAllUrls}  = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/analytics/:shortId', handleAnalytics);

router.get('/:shortId', handleRedirectToUrl);

router.get('/', handleUserUrls);

module.exports = router;