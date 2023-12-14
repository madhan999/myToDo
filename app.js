require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const  bodyParser = require('body-parser')
// server
const app = express()
const port = process.env.PORT || 8050

app.use(bodyParser.json())
//router
app.use('/v1/auth', router.authRouter)
app.use('/v1/task', router.taskRouter)
// starting server
app.listen(port, () => {
    console.log("Server listen at ", process.env.PORT);
})