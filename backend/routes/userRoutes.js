const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser) //routing each user http request to the approopiate function 
router.post('/login', loginUser)
router.get('/me', protect, getMe)


module.exports = router
