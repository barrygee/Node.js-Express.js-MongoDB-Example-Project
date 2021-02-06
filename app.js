require('dotenv').config() // import dotenv lib

const express = require('express')
const app = express()
const mongoose = require('mongoose')

/*
    - connect to the MongoDB database

    - process.env.MONGODB_URL uses the MONGODB_URL value in .env

    - { useNewUrlParser: true, useUnifiedTopology: true } passed into connect() to remove deprecation errors
*/
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

/*
    - hook up events to the database to check its working as expected
*/
const db = mongoose.connection
db.on('error', error => console.error(error))
db.on('open', () => console.log(('Connected to Database')))


/*
    - lets the server accept JSON as a body, instead of a POST element
*/
app.use(express.json())

/*
    - routes
*/
const logsRouter = require('./routes/logs')
app.use('/logs', logsRouter)

app.listen(3030, () => console.info('server running on localhost:3030'))

