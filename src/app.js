//import this files
const express = require('express')
const authRoutes = require('./routes/auth.routes.js')
const postRoutes = require('./routes/post.routes.js')
const cookieParser = require('cookie-parser');



//use the middleware for the fatch data  
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))//


app.use('/auth', authRoutes) // Fix: Add /auth prefix
app.use('/api/posts', postRoutes)




module.exports = app;