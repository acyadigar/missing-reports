const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user')
const reportRouter = require('./routes/report')
const authRouter = require('./routes/auth')

require('./mongo-connection')
const app = express()

app.set('view engine', 'pug')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/report', reportRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app