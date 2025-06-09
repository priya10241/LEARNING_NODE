const express = require('express');
const router = express.Router();
const {handleGetAllUsers, getUserWithId , updateUserById, deleteUserById, createNewUser} = require('../controllers/user');


//INSERT VALUES IN DATABASE START
router.route('/')
.post(createNewUser)
.get(handleGetAllUsers);


router.get('/:id', getUserWithId);

//UPDATE VALUES IN DATABASE
router.patch('/:id', updateUserById);

//DELETE VALUES IN DATABASE
router.delete('/:id', deleteUserById);

module.exports = router;
