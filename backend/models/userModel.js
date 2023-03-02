const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ //schema for users with name password and email, email is given unique attribute in order to prevent duplicate emails for accounts
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)