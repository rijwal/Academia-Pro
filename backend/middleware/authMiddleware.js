const jwt = require('jsonwebtoken') //using jsonwebtokens to verify http requests with the user that is making the requests
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler (async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //checking that a token is available has been inputted into the request
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorizaed')
        }
    }

    //if no token is present error is thrown
    if (!token) {
        res.status(401)
        throw new Error('not authorizaed, no token')
    }
})

module.exports = {protect}