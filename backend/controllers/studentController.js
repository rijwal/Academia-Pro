//file that defines what happens when each http request is called

const asyncHandler = require('express-async-handler') //importing the express aynchronous handler

const Student = require('../models/studentModel') //importing student and user models for when adding to or modifying the database
const User = require('../models/userModel')

const getStudents = asyncHandler( async (req,res) => { // takes the json web token and gets the user id from this and then retreievs the goals with the same id
    const goals = await Student.find({user: req.user.id})

    res.status(200).json(goals)
})

const setStudent = asyncHandler( async (req,res) => {

    if (!(req.body.name||req.body.age||req.body.grade)) { //if each field is not put through text fields it throws an error
        res.status(400)
        throw new Error('Please add a text field')
    }

    const initialScore = (req.body.sportingEvents * 5) + (req.body.nonSportingEvents * 5) //initializing the student's score thrugh the amounf of events they participate in

    const student = await Student.create({// creating the student using the mongoose model and sending to the database

        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        score: initialScore,
        user: req.user.id,
        sportingEvents: req.body.sportingEvents,
        nonSportingEvents: req.body.nonSportingEvents

    })

    res.status(200).json(student)
})

const updateStudent = asyncHandler( async (req,res) => { //updating the student by taking in the user id again through jsonwebtoken
    const student = await Student.findById(req.params.id) //finding the specific goal based on the id passed through the route

    if (!student) {
        res.status(400)
        throw new Error('Student not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (student.user.toString() !== user.id) { //making sure user id from json webtoken matches user id attached to the goal
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { //updating each json field of the specific student based on the input
        new: true
    })

    res.status(200).json(updatedStudent)
})

const deleteStudent = asyncHandler( async (req,res) => {
    const student = await Student.findById(req.params.id) //same as update function

    if (!student) {
        res.status(400)
        throw new Error('Student not Found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the student user
    if (student.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await student.remove() //deletes student from database

    res.status(200).json({id: req.params.id})
})

module.exports = {getStudents, setStudent, updateStudent, deleteStudent}