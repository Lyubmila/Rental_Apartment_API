const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig = require('./config/mongoConfig')
const usersRouter = require('./routes/usersRouter')
const adsRouter = require('./routes/adsRouter')
const authRouter = require('./routes/authRouter')


const app = express()
const PORT = process.env.PORT || 4000  //for Heroku


//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

//routers
app.use('/users', usersRouter)
app.use('/ads',adsRouter)
app.use('/auth', authRouter)


app.get('/', (req, res) =>{
    res.status(200).json("Welcome to my API!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoConfig()
})