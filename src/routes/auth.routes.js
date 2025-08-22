//auth.routes kon kon se hai iske liye kaam me aati hai

const {registerController, loginController}= require('../controllers/auth.controller.js')


const express = require('express');

const router = express.Router();

// get data for the user
router.post('/register', registerController)
router.post('/login',loginController )


module.exports = router;