//importing the requierd modules and functions from dependancies
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB() //running connectDB function that connects mongodb database to  ongoose

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/students', require('./routes/studentRoutes')) //setting the localhost routes that the api interacts with
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler) //making sure every process goes through error middleware

app.listen(port, () => console.log(`Server started on ${port}`)) //initializing port number that server runs on