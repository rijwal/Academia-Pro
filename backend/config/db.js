// initializing the connection between our mongoDB cluster and mongoose

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGU_URI) //using the specific mongodb URI defined in the .env

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB