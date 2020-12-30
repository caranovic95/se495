const express = require('express')
const router = express.Router()
const User = require('../controllers/user.controler')


router.post('/auth', User.auth)

router.post('/register', User.register)

module.exports = router;