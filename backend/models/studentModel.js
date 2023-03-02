const mongoose = require('mongoose') 

const studentSchema = mongoose.Schema({ //creating the student schema as a json object
    user: { //requires the user id that created the student so it can be cross verified with the id recieved from the json web token at login
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { //rest of the requires elements of the student
        type: String,
        required: [true, 'Please add a name value']
    },
    age: {},
    grade: {},
    score: {},
    sportingEvents: {},
    nonSportingEvents: {}
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('Student', studentSchema)