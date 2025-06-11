const express = require('express');
const {handleGenerateNewShortUrl, handleAnalytics, handleRedirectToUrl}  = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/analytics/:shortId', handleAnalytics);

router.get('/:shortId', handleRedirectToUrl);
module.exports = router;