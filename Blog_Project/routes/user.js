const express = require('express');
const {handleGetUserSignIn, handleGetUserSignUp, handleUserSignUp, handleUserSignIn, handleUserLogout} = require('../controllers/user');

const router = express.Router();

router.get('/signup', handleGetUserSignUp);

router.get('/signin', handleGetUserSignIn);

router.post('/signup', handleUserSignUp);

router.post('/signin', handleUserSignIn);

router.get('/logout', handleUserLogout);
module.exports = router;