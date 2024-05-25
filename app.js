"use strict"

const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure:false,
        sameSite: true
    }
}))

app.use(require('./routers/router'))

app.listen(port, () => {
    console.log(`App Running on Port ${port}`)
})