const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req,res) => {
    const name = req.body.name //taking in the input for email name and password
    const email = req.body.email
    const password = req.body.password

    if (!name||!email||!password) { //throws an error if all fields are recieved
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) { 
        res.status(400)
        throw new Error("User already exists")
    }
    
    //hashes password using bcryptjs
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creates user using the input
    const user = await User.create({
        name, email, password: hashedPassword
    })

    //generates the json web token upon creation
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email :user.email,
            token: generateToken(user._id)
        })
    } else { 
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const loginUser = asyncHandler(async (req,res) => {
    const email = req.body.email 
    const password = req.body.password

    //check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){ //compares the password input with the hashed password in the database
        res.json({_id: user.id, //if they are equal then a json web token is generated that is carried on for the rest of the session 
            name: user.name,
            email :user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

//private
const getMe = asyncHandler(async (req,res) => { //retrieves the user data based on the id recieved by the jsonwebtoken
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })

})

//generate JWT functino
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d',})
}

module.exports = {registerUser, loginUser, getMe}