const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http');
const User=require('./routes/userRoute')
const Vehicle=require('./routes/vehicleRoute')

//Admin Routes path
//express app
const app = express()
const server = http.createServer(app)

//set the limit to 100MB for request
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routing for User
// User Registration Route
app.use('/auth/user', User)

// Vehicle Route
app.use('/auth/user/vehicle',Vehicle)

//PORT number
const PORT = process.env.PORT

//connect to mongoDB
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 50000 })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Database Connected on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

